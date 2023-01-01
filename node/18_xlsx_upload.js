const express = require('express');
const app = express();
const xlsx = require('xlsx');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post('/api/xlsx', upload.single('xlsx'), async (req, res) => {
  console.log(req.file);
  const workbook = xlsx.readFile(req.file.path); // 엑셀 파일 읽기
  const sheetNames = workbook.SheetNames; // 엑셀 파일의 시트 이름들
  const worksheet = workbook.Sheets[sheetNames[0]]; // 첫번째 시트
  const rows = xlsx.utils.sheet_to_json(worksheet); // 시트를 JSON으로 변환
  res.send(rows);
});

app.listen(3000, () => {
  console.log('서버가 포트 3000번으로 시작되었습니다.');
});
