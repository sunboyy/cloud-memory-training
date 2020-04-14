import { Module } from '@nestjs/common';
import { CalculationService } from './calculation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calculation } from './calculation.entity';
import { CalculationController } from './calculation.controller';
import { RandomGeneratorService } from './random-generator/random-generator.service';

@Module({
  imports: [TypeOrmModule.forFeature([Calculation])],
  providers: [CalculationService, RandomGeneratorService],
  controllers: [CalculationController],
})
export class CalculationModule {}
