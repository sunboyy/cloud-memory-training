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
        console.log(event.data);
      });

      const start = () => mediaRecorder.start();

      const stop = () =>
        new Promise((resolve) => {
          mediaRecorder.addEventListener('stop', () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm;codecs=opus' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            const play = () => audio.play();
            console.log('audioBlob, audioUrl, audio');
            console.log(audioUrl);
            console.log(audio);

            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = () => {
              const base64data = reader.result;
              console.log('complete reading');
              resolve({ audioBlob, audioUrl, play, audioChunks, base64data });
            };
          });

          mediaRecorder.stop();
        });

      resolve({ start, stop });
    });
  }

  async triggerListen(): Promise<string> {
    const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

    const recorder = await this.getRecorder();
    recorder.start();
    await sleep(2000);
    const audio = await recorder.stop();
    audio.play();
    return audio.base64data;
  }

  async triggerListen1(): Promise<any> {
    const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

    const recorder = await this.getRecorder();
    recorder.start();
    return recorder;
  }

  async stop(recorder) {
    const audio = await recorder.stop();
    audio.play();
    return audio.base64data;
  }
}
