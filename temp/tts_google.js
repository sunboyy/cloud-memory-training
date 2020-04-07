const fs = require('fs');
const request = require('request');
const utf8 = require('utf8');

url = 'https://translate.google.com/translate_tts?';
encoding = 'UTF-8';
client = 'tw-ob';
language = 'th';
word = 'กูเกิ้นทานสเลด';
word = utf8.encode(word);
save_name = 'ggts.wav';
get_url = url+'ie='+encoding+'&client='+client+'&tl='+language+'&q='+word;
console.log(get_url);
request
  .get(get_url)
  .on('error', function(err) {
    // handle error
  })
  .pipe(fs.createWriteStream(save_name));