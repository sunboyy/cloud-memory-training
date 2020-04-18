import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListenService {

  chunks = [];
  stream = null;
  recorder = null;
  MediaRecorder;
  constructor() { }

  stop_listen() {

  }
  triggerListen() {
    var audioContext = new AudioContext();
    var BUFF_SIZE = 16384;
    var audioInput = null,
        microphone_stream = null,
        gain_node = null,
        script_processor_node = null,
        script_processor_fft_node = null,
        analyserNode = null,
        recorder = null;

    if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.getUserMedia;
    if (navigator.getUserMedia){
      navigator.getUserMedia({audio:true},
        function(stream) {start_microphone(stream);},
        function(e) {alert('Error capturing audio.');}
      );
  } else { alert('getUserMedia not supported in this browser. try Google Chrome'); }

  function start_microphone(stream){
    console.log("enter start_microphone function");
    createGain(stream);
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = e => {
      this.chunks.push(e.data);
      console.log(e);
      if(recorder.state == 'inactive')  makeLink();
    };
    recorder.start();
    console.log('got media successfully');
  }

    function createGain(stream){
    gain_node = audioContext.createGain();
    gain_node.connect( audioContext.destination );

    microphone_stream = audioContext.createMediaStreamSource(stream);
    microphone_stream.connect(gain_node);

    script_processor_node = audioContext.createScriptProcessor(BUFF_SIZE, 1, 1);

    microphone_stream.connect(script_processor_node);

  }
    // --- enable volume control for output speakers

    document.getElementById('volume').addEventListener('change', function() {
        var curr_volume = this.value;
        gain_node.gain.value = curr_volume;
        console.log("curr_volume ", curr_volume);
    });

    function makeLink(){
      console.log('make link func');
      let blob = new Blob(this.chunks, {type: 'audio/wav' })
        , url = URL.createObjectURL(blob)
        , li = document.createElement('li')
        , mt = document.createElement('audio')
        , hf = document.createElement('a')
      ;
      mt.controls = true;
      mt.src = url;
      hf.href = url;
      hf.download = 'record.wav';
      hf.innerHTML = `donwload ${hf.download}`;
      li.appendChild(mt);
      li.appendChild(hf);
      ul.appendChild(li);
    }

    };
  }
