import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomGeneratorService {
  minimumFactor = 10;
  maximumFactor = 99;

  generateRandomFactor(): number {
    return (
      Math.floor(Math.random() * (this.maximumFactor - this.minimumFactor + 1)) + this.minimumFactor
    );
  }

  generateRandomOperator(): string {
    return 'add';
  }
}
