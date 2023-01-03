const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const mime = require('mime');

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get('/file/:filename', (req, res) => {
  const file = './uploads/' + req.params.filename;
  try {
    if (fs.existsSync(file)) {
      // const mimetype = mime.getType(file);
      // const filename = path.basename(file);
      // res.setHeader('Content-disposition', 'attachment; filename=' + filename); // 다운로드시 파일명
      // res.setHeader('Content-type', mimetype); // 다운로드시 파일타입
      // const filestream = fs.createReadStream(file);
      // filestream.pipe(res);
      res.download(file);
    } else {
      res.send('File not found');
    }
  } catch (err) {
    console.log(err);
    res.send('File Error');
  }
});
