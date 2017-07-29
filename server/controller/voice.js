import fs from 'fs';
import formidable from 'formidable';
import request from 'request';

function uploadVoice(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    console.log('files', files);

    const filePath = files.uploadfile.path;
    const stream = fs.createReadStream(filePath);

    streamToString(stream, data => {
      const options = {
        headers: {
          'Ocp-Apim-Subscription-Key': '38eb29452be3475886f34cacf1426de5',
          identificationProfileId: 'a8830bea-7b6e-4c66-a078-31f81a4660f8'
        },
        method: 'post',
        body: {
          data
        },
        json: true,
        url: 'https://westus.api.cognitive.microsoft.com/spid/v1.0/identificationProfiles/111f427c-3791-468f-b709-fcef7660fff9/enroll?shortAudio=true'
      };

      request(options, (err, response, body) => {
        if (err) {
          return res.status(500).json({ message: 'SERVER_ERROR' });
        }
        console.log('body', body);
        return res.json({ body });
      });
    });
  });
}

function streamToString(stream, cb) {
  const chunks = [];
  stream.on('data', (chunk) => {
    chunks.push(chunk.toString());
  });
  stream.on('end', () => {
    cb(chunks.join(''));
  });
}

module.exports = {
  uploadVoice
};
