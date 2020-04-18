import { Injectable } from '@angular/core';

declare var MediaRecorder: any;

@Injectable({
  providedIn: 'root'
})
export class ListenService {
  stopListen() {}

  getRecorder(): Promise<any> {
    return new Promise(async (resolve) => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      const start = () => mediaRecorder.start();

      const stop = () =>
        new Promise((resolve) => {
          mediaRecorder.addEventListener('stop', () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            const play = () => audio.play();

            const save = (name, body) => {
              console.log(name);
              console.log(body);
            };
            resolve({ audioBlob, audioUrl, play, save, audioChunks });
          });

          mediaRecorder.stop();
        });

      resolve({ start, stop });
    });
  }

  async triggerListen(): Promise<string> {
    const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

    const recorder = await this.getRecorder();
    recorder.start();
    await sleep(3000);
    const audio = await recorder.stop();
    audio.play();
    console.log(audio.audioUrl);
    return audio.audioUrl;
  }
}
