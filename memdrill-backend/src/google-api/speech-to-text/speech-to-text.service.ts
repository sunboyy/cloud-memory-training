import { Injectable } from '@nestjs/common';
import speech from '@google-cloud/speech';
import * as linear16 from 'linear16';
import * as fs from 'fs';

@Injectable()
export class SpeechToTextService {
  async toText(base64data: string): Promise<string> {
    const tempOriginal = 'temp.weba';
    const tempRaw = 'tempraw.raw';
    
    const buff = new Buffer(base64data, 'base64');
    fs.writeFileSync(tempOriginal, buff);
    var audioBytes;

    // Returns the output path, ex: ./output.wav
    const tempRawPath = await linear16(tempOriginal, tempRaw);
      
    const file = fs.readFileSync(tempRawPath);
    audioBytes = file.toString('base64');
    
    // const audioBytes = base64data;
    const client = new speech.SpeechClient();
    const audio = {
      content: audioBytes,
    };
    const config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'th-TH',
    };
    const request = {
      audio: audio,
      config: config,
    };
    console.log('audioBytes:' + audioBytes);
    // // Detects speech in the audio file
    const [response] = await client.recognize({
      audio: audio,
      config: {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'th-TH'
      }
    });
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);
    return transcription;
  }
}
