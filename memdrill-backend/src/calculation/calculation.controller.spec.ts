import { Test, TestingModule } from '@nestjs/testing';
import { CalculationController } from './calculation.controller';
import { CalculationService } from './calculation.service';
import { CalculationMockService } from './calculation-mock.service';

describe('Calculation Controller', () => {
  let controller: CalculationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculationController],
      providers: [{ provide: CalculationService, useClass: CalculationMockService }],
    }).compile();

    controller = module.get<CalculationController>(CalculationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /calculation/random', () => {
    it('should return calculation result', async () => {
      const providedCalculation = controller['calculationService'].createRandomCalculation('easy');
      const calculation = controller.getRandomCalculation('easy').getValue();
      expect(calculation.factorA).toEqual(providedCalculation.factorA);
      expect(calculation.factorB).toEqual(providedCalculation.factorB);
      expect(calculation.operator).toEqual(providedCalculation.operator);
    });
  });
});
