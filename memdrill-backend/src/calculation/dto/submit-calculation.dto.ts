import { IsInt, IsIn, IsString } from 'class-validator';

export class SubmitCalculationDto {
  @IsInt()
  factorA: number;

  @IsInt()
  factorB: number;

  @IsIn(['add'])
  operator: string;

  @IsInt()
  answer: number;

  @IsString()
  signature: string;
}
