const linear16 = require('linear16');
const fs = require('fs');
const speech = require('@google-cloud/speech');

async function main() {
  // Creates a client
  const client = new speech.SpeechClient();

  const input_file = '1002temp';
  const output_file = '1002.raw';
  
  const outPath = await linear16(input_file, output_file);
  console.log('converted to: '+outPath); // Returns the output path, ex: ./output.wav

  var fileName = output_file;
  // The name of the audio file to transcribe
  console.log('open this!'); // Returns the output path, ex: ./output.wav
  console.log(fileName); // Returns the output path, ex: ./output.wav
  //const fileName = outPath;

  // Reads a local audio file and converts it to base64
  const file = fs.readFileSync(fileName);
  const audioBytes = file.toString('base64');
  console.log('start :'+ audioBytes);
  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
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

  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  console.log(`Transcription: ${transcription}`);
}

main().catch(console.error);