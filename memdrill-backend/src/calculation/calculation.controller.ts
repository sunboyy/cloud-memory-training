import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Calculation } from './calculation.entity';
import { CalculationService } from './calculation.service';
import { SubmitCalculationDto } from './dto/submit-calculation.dto';

@Controller('calculation')
export class CalculationController {
  constructor(private readonly calculationService: CalculationService) {}

  @Get('random')
  getRandomCalculation(): Calculation {
    return this.calculationService.createRandomCalculation();
  }

  @Post('submit')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  submitCalculation(@Request() req, @Body('calculation') calculationDto: SubmitCalculationDto) {
    const calculation = new Calculation();
    calculation.factorA = calculationDto.factorA;
    calculation.factorB = calculationDto.factorB;
    calculation.operator = calculationDto.operator;
    calculation.answer = calculationDto.answer;
    calculation.signature = calculationDto.signature;
    calculation.user = req.user;
    return this.calculationService.submitCalculation(calculation);
  }
}
