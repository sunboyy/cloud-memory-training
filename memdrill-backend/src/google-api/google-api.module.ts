import { Module } from '@nestjs/common';
import { SpeechToTextService } from './speech-to-text/speech-to-text.service';
import { TextToSpeechService } from './text-to-speech/text-to-speech.service';

@Module({
  providers: [SpeechToTextService, TextToSpeechService]
})
export class GoogleApiModule {}
