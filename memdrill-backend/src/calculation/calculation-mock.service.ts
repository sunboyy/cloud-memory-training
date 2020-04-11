import { Calculation } from './calculation.entity';

export class CalculationMockService {
  createRandomCalculation(): Calculation {
    const calculation = new Calculation();
    calculation.factorA = 1;
    calculation.factorB = 2;
    calculation.operator = 'add';
    return calculation;
  }
}
