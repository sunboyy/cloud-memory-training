import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomGeneratorService {
  difficulties = {
    easy: {
      minimumFactor: 2,
      maximumFactor: 30,
    },
    normal: {
      minimumFactor: 30,
      maximumFactor: 200,
    },
    hard: {
      minimumFactor: 200,
      maximumFactor: 1200,
    },
  };

  generateRandomFactor(difficulty: string): number {
    return (
      Math.floor(
        Math.random() *
          (this.difficulties[difficulty].maximumFactor -
            this.difficulties[difficulty].minimumFactor +
            1),
      ) + this.difficulties[difficulty].minimumFactor
    );
  }

  generateRandomOperator(): string {
    const operators = ['add', 'sub'];
    return operators[Math.floor(Math.random() * operators.length)];
  }
}
