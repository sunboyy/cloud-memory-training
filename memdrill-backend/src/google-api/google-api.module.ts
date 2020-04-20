import { Module } from '@nestjs/common';
import { SpeechToTextService } from './speech-to-text/speech-to-text.service';
import { GoogleApiController } from './google-api.controller';

@Module({
  providers: [SpeechToTextService],
  controllers: [GoogleApiController],
})
export class GoogleApiModule {}
