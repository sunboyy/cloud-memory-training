import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { SpeechToTextService } from './speech-to-text/speech-to-text.service';
import { SpeechToTextDto } from './dto/speech-to-text.dto';

@Controller('google-api')
export class GoogleApiController {
  constructor(private readonly speechToTextService: SpeechToTextService) {}

  @Post('stt')
  @UsePipes(ValidationPipe)
  speechToText(@Body('audio') audio: SpeechToTextDto) {
    return this.speechToTextService.toText(audio.base64Data);
  }
}
