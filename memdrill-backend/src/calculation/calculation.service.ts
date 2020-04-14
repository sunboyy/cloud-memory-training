import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash } from 'crypto';
import { Repository } from 'typeorm';
import { Calculation } from './calculation.entity';
import { RandomGeneratorService } from './random-generator/random-generator.service';
import { Result } from '../common/result';

@Injectable()
export class CalculationService {
  private signatureKey = 'secretkey';

  constructor(
    private readonly randomGeneratorService: RandomGeneratorService,
    @InjectRepository(Calculation) private readonly calculationRepository: Repository<Calculation>,
  ) {}

  createRandomCalculation(difficulty: string): Calculation {
    const calculation = new Calculation();
    calculation.factorA = this.randomGeneratorService.generateRandomFactor(difficulty);
    calculation.factorB = this.randomGeneratorService.generateRandomFactor(difficulty);
    calculation.operator = this.randomGeneratorService.generateRandomOperator();
    calculation.difficulty = difficulty;
    calculation.signature = this.createSignature(calculation);
    return calculation;
  }

  async submitCalculation(calculation: Calculation): Promise<Result<undefined>> {
    if (!this.verifySignature(calculation)) {
      return Result.fail('Invalid signature');
    }
    if (!this.checkAnswer(calculation)) {
      return Result.fail('Incorrect answer');
    }
    await this.calculationRepository.save(calculation);
    return Result.ok(undefined);
  }

  checkAnswer(calculation: Calculation): boolean {
    return this.calculate(calculation) === calculation.answer;
  }

  calculate(calculation: Calculation): number | undefined {
    if (calculation.operator === 'add') {
      return calculation.factorA + calculation.factorB;
    } else if (calculation.operator === 'sub') {
      return calculation.factorA - calculation.factorB;
    }
  }

  createSignature(calculation: Calculation): string {
    const shasum = createHash('sha1');
    const payload =
      calculation.factorA +
      calculation.factorB +
      calculation.operator +
      ':' +
      calculation.difficulty +
      ':' +
      this.signatureKey;
    shasum.update(payload);
    return shasum.digest('hex');
  }

  verifySignature(calculation: Calculation): boolean {
    const realSignature = this.createSignature(calculation);
    return realSignature == calculation.signature;
  }
}
