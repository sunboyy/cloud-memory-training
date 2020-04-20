import { Injectable } from '@nestjs/common';
import { SpeechClient } from '@google-cloud/speech';
import * as linear16 from 'linear16';
import { readFileSync, writeFileSync } from 'fs';

@Injectable()
export class SpeechToTextService {
  async toText(base64data: string): Promise<string> {
    const tempOriginal = 'temp.weba';
    const tempRaw = 'temp.raw';

    const buff = Buffer.from(base64data, 'base64');
    writeFileSync(tempOriginal, buff);

    await linear16(tempOriginal, tempRaw);

    const file = readFileSync(tempRaw);
    const audioBytes = file.toString('base64');

    return await this.transcribeLinear16(audioBytes);
  }

  async transcribeLinear16(base64AudioBytes: string): Promise<string> {
    const client = new SpeechClient();
    const [response] = await client.recognize({
      audio: {
        content: base64AudioBytes,
      },
      config: {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'th-TH',
      },
    });
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    return transcription;
  }
}
