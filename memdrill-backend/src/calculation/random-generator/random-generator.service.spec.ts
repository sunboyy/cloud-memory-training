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
        valueSet.add(service.generateRandomFactor('easy'));
      }
      expect(valueSet.size).toBeGreaterThan(1);
    });

    it('should not go out of boundary', () => {
      for (let i = 0; i < 100; i++) {
        expect(service.generateRandomFactor('easy')).toBeGreaterThanOrEqual(
          service.difficulties.easy.minimumFactor,
        );
        expect(service.generateRandomFactor('easy')).toBeLessThanOrEqual(
          service.difficulties.easy.maximumFactor,
        );
      }
    });

    it('should include boundary values', () => {
      service.difficulties.easy.minimumFactor = 4;
      service.difficulties.easy.maximumFactor = 5;
      let minimumIncluded = false;
      let maximumIncluded = false;
      for (let i = 0; i < 100; i++) {
        const value = service.generateRandomFactor('easy');
        if (value === service.difficulties.easy.minimumFactor) {
          minimumIncluded = true;
        } else if (value === service.difficulties.easy.maximumFactor) {
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
