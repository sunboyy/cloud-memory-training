import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculationService } from './calculation.service';
import { RandomGeneratorService } from './random-generator/random-generator.service';
import { RandomGeneratorMockService } from './random-generator/random-generator-mock.service';
import { Calculation } from './calculation.entity';
import { User } from '../user/user.entity';

describe('CalculationService', () => {
  let service: CalculationService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CalculationService,
        { provide: RandomGeneratorService, useClass: RandomGeneratorMockService },
      ],
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          synchronize: true,
          entities: [Calculation, User],
        }),
        TypeOrmModule.forFeature([Calculation, User]),
      ],
    }).compile();

    service = module.get<CalculationService>(CalculationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createRandomCalculation', () => {
    it('should return factor from RandomGenerator', () => {
      const calculation = service.createRandomCalculation('easy');
      expect(calculation.factorA).toBe(15);
      expect(calculation.factorB).toBe(15);
    });
  });

  describe('checkAnswer', () => {
    it('should return false if operator is not supported', () => {
      const calculation = new Calculation();
      calculation.factorA = 2;
      calculation.factorB = 3;
      calculation.operator = 'mul';
      calculation.signature = service.createSignature(calculation);
      calculation.answer = 6;
      expect(service.checkAnswer(calculation)).toBe(false);
    });

    it('should verify correctness of the answer', () => {
      const calculation = service.createRandomCalculation('easy');
      calculation.answer = calculation.factorA + calculation.factorB;
      expect(service.checkAnswer(calculation)).toBe(true);
      calculation.answer--;
      expect(service.checkAnswer(calculation)).toBe(false);
    });
  });

  describe('calculate', () => {
    it('should return undefined if operator is not supported', () => {
      const calculation = new Calculation();
      calculation.factorA = 2;
      calculation.factorB = 3;
      calculation.operator = 'mul';
      expect(service.calculate(calculation)).toBeUndefined();
    });

    it('should return added value for add operator', () => {
      const calculation = new Calculation();
      calculation.factorA = 2;
      calculation.factorB = 3;
      calculation.operator = 'add';
      expect(service.calculate(calculation)).toBe(5);
    });

    it('should return subtracted value for sub operator', () => {
      const calculation = new Calculation();
      calculation.factorA = 2;
      calculation.factorB = 3;
      calculation.operator = 'sub';
      expect(service.calculate(calculation)).toBe(-1);
    });
  });

  describe('signature', () => {
    it('should verify correct signature', () => {
      const calculation = new Calculation();
      calculation.factorA = 5;
      calculation.factorB = -3;
      calculation.operator = 'add';
      calculation.signature = service.createSignature(calculation);

      expect(service.verifySignature(calculation)).toBe(true);
    });

    it('should deny incorrect signature', () => {
      const calculation = new Calculation();
      calculation.factorA = 5;
      calculation.factorB = -3;
      calculation.operator = 'add';
      calculation.signature = service.createSignature(calculation);
      calculation.factorB = 0;

      expect(service.verifySignature(calculation)).toBe(false);
    });
  });
});
