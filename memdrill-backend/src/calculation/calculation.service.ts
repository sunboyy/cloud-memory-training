import { Injectable } from '@nestjs/common';
import { Calculation } from './calculation.entity';
import { RandomGeneratorService } from './random-generator/random-generator.service';
import { createHash } from 'crypto';

@Injectable()
export class CalculationService {
  private signatureKey = 'secretkey';

  constructor(private readonly randomGeneratorService: RandomGeneratorService) {}

  createRandomCalculation(): Calculation {
    const calculation = new Calculation();
    calculation.factorA = this.randomGeneratorService.generateRandomFactor();
    calculation.factorB = this.randomGeneratorService.generateRandomFactor();
    calculation.operator = 'add';
    calculation.signature = this.createSignature(calculation);
    return calculation;
  }

  checkAnswer(calculation: Calculation): boolean {
    if (!this.verifySignature(calculation)) {
      return false;
    }
    if (calculation.operator === 'add') {
      return calculation.factorA + calculation.factorB === calculation.answer;
    }
    return false;
  }

  createSignature(calculation: Calculation): string {
    const shasum = createHash('sha1');
    const payload =
      calculation.factorA + calculation.factorB + calculation.operator + ':' + this.signatureKey;
    shasum.update(payload);
    return shasum.digest('hex');
  }

  verifySignature(calculation: Calculation): boolean {
    const realSignature = this.createSignature(calculation);
    return realSignature == calculation.signature;
  }
}
