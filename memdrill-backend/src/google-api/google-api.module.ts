import { Module } from '@nestjs/common';
import { SpeechToTextService } from './speech-to-text/speech-to-text.service';
import { TextToSpeechService } from './text-to-speech/text-to-speech.service';
import { GoogleApiController } from './google-api.controller';

@Module({
  providers: [SpeechToTextService, TextToSpeechService],
  controllers: [GoogleApiController],
})
export class GoogleApiModule {}
