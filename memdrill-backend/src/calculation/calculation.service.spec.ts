import { Test, TestingModule } from '@nestjs/testing';
import { CalculationService } from './calculation.service';
import { RandomGeneratorService } from './random-generator/random-generator.service';
import { RandomGeneratorMockService } from './random-generator/random-generator-mock.service';
import { Calculation } from './calculation.entity';

describe('CalculationService', () => {
  let service: CalculationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CalculationService,
        { provide: RandomGeneratorService, useClass: RandomGeneratorMockService },
      ],
    }).compile();

    service = module.get<CalculationService>(CalculationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createRandomCalculation', () => {
    it('should return factor from RandomGenerator', () => {
      const calculation = service.createRandomCalculation();
      expect(calculation.factorA).toBe(15);
      expect(calculation.factorB).toBe(15);
    });
  });

  describe('checkAnswer', () => {
    it('should reject incorrect signature', () => {
      const calculation = service.createRandomCalculation();
      calculation.factorA++;
      calculation.answer = calculation.factorA + calculation.factorB;
      expect(service.checkAnswer(calculation)).toBe(false);
    });

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
      const calculation = service.createRandomCalculation();
      calculation.answer = calculation.factorA + calculation.factorB;
      expect(service.checkAnswer(calculation)).toBe(true);
      calculation.answer--;
      expect(service.checkAnswer(calculation)).toBe(false);
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
