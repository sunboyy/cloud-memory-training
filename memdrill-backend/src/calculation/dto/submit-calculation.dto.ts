import { IsInt, IsIn, IsString } from 'class-validator';

export class SubmitCalculationDto {
  @IsInt()
  factorA: number;

  @IsInt()
  factorB: number;

  @IsIn(['add', 'sub'])
  operator: string;

  @IsIn(['easy', 'normal', 'hard'])
  difficulty: string;

  @IsInt()
  answer: number;

  @IsString()
  signature: string;
}
