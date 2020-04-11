import { Test, TestingModule } from '@nestjs/testing';
import { RandomGeneratorService } from './random-generator.service';

describe('RandomGeneratorService', () => {
  let service: RandomGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomGeneratorService],
    }).compile();

    service = module.get<RandomGeneratorService>(RandomGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateRandomFactor', () => {
    it('should not be the same value all the time', () => {
      const valueSet = new Set<number>();
      for (let i = 0; i < 100; i++) {
        valueSet.add(service.generateRandomFactor());
      }
      expect(valueSet.size).toBeGreaterThan(1);
    });

    it('should not go out of boundary', () => {
      for (let i = 0; i < 100; i++) {
        expect(service.generateRandomFactor()).toBeGreaterThanOrEqual(service.minimumFactor);
        expect(service.generateRandomFactor()).toBeLessThanOrEqual(service.maximumFactor);
      }
    });

    it('should include boundary values', () => {
      service.minimumFactor = 4;
      service.maximumFactor = 5;
      let minimumIncluded = false;
      let maximumIncluded = false;
      for (let i = 0; i < 100; i++) {
        const value = service.generateRandomFactor();
        if (value === service.minimumFactor) {
          minimumIncluded = true;
        } else if (value === service.maximumFactor) {
          maximumIncluded = true;
        }
        if (minimumIncluded && maximumIncluded) {
          break;
        }
      }
      expect(minimumIncluded).toBe(true);
      expect(maximumIncluded).toBe(true);
    });
  });
});
