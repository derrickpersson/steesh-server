const { spawn, execFile } = require('child_process');
// const wkhtmltopdf = spawn(['wkhtmltopdf -print-media-type --zoom 3 https://electricliterature.com/rejecting-a-book-by-its-cover-c0a92ed1f76f medium.pdf']);

// wkhtmltopdf.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// wkhtmltopdf.stderr.on('data', (data) => {
//   console.log(`stderr: ${data}`);
// });

// wkhtmltopdf.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });

// exec('wkhtmltopdf -print-media-type --zoom 3 https://electricliterature.com/rejecting-a-book-by-its-cover-c0a92ed1f76f medium.pdf', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`exec error: ${error}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// });

execFile("/usr/local/bin/wkhtmltopdf", ["--print-media-type","--disable-external-links",'"--load-error-handling ignore"', '"--load-media-error-handling ignore"', '"--zoom 4"', '"https://medium.com/s/story/who-do-we-want-to-trust-writer-eliot-peper-on-his-new-novel-and-the-future-of-tech-6ce14c84e21b"', '"medium.pdf"'], (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

