import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Calculation } from './calculation.entity';
import { CalculationService } from './calculation.service';
import { SubmitCalculationDto } from './dto/submit-calculation.dto';
import { Result } from '../common/result';

@Controller('calculation')
export class CalculationController {
  constructor(private readonly calculationService: CalculationService) {}

  @Get('random')
  getRandomCalculation(@Query('difficulty') difficulty: string): Result<Calculation> {
    if (!['easy', 'normal', 'hard'].includes(difficulty)) {
      return Result.fail('Invalid difficulty');
    }
    return Result.ok(this.calculationService.createRandomCalculation(difficulty));
  }

  @Post('submit')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  submitCalculation(@Request() req, @Body('calculation') calculationDto: SubmitCalculationDto) {
    const calculation = new Calculation();
    Object.assign(calculation, calculationDto);
    calculation.user = req.user;
    return this.calculationService.submitCalculation(calculation);
  }
}
