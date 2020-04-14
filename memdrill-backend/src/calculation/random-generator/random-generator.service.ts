import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomGeneratorService {
  difficulties = {
    easy: {
      minimumFactor: 5,
      maximumFactor: 99,
    },
    normal: {
      minimumFactor: 50,
      maximumFactor: 999,
    },
    hard: {
      minimumFactor: 500,
      maximumFactor: 9999,
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
