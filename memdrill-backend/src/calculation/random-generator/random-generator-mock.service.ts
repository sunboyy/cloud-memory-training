import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomGeneratorMockService {
  minimumFactor = 10;
  maximumFactor = 20;

  generateRandomFactor(): number {
    return (this.maximumFactor + this.minimumFactor) / 2;
  }
}
