import { IsString, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(6, 32)
  readonly username!: string;

  @IsString()
  @Length(6, 50)
  readonly password!: string;
}
