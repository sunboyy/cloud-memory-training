import { Controller, Get } from '@nestjs/common';
import { Calculation } from './calculation.entity';
import { CalculationService } from './calculation.service';

@Controller('calculation')
export class CalculationController {
  constructor(private readonly calculationService: CalculationService) {}

  @Get('random')
  getRandomCalculation(): Calculation {
    return this.calculationService.createRandomCalculation();
  }
}
