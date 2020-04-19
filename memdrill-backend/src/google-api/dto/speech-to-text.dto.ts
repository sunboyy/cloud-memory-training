import { IsString } from 'class-validator';

export class SpeechToTextDto {
  @IsString()
  base64Data: string;
}
