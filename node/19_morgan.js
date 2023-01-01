const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');

// 로그관리
// 개발자에 의해서 의도적으로 기록하는 메시지
// 시스템을 운영하면서 발생하는 예기치 못한 에러

// rfs에서 지정한 파일 생성 시간 간격에 따른 로그 파일명을 반환
const generator = (time, index) => {
  if (!time) return 'file.log';
  const yearmonth =
    time.getFullYear() + '' + (time.getMonth() + 1).toString().padStart(2, '0');
  const day = time.getDate().toString().padStart(2, '0');
  const hour = time.getHours().toString().padStart(2, '0');
  const minute = time.getMinutes().toString().padStart(2, '0');
  return `${yearmonth}\/${day}-${hour}${minute}-${index}.log`;
};

const accessLogStream = rfs.createStream(generator, {
  // interval: '1d', // 1일마다 로그 파일 생성
  interval: '1m', // 1분마다 로그 파일 생성
  size: '10M', // 10MB가 넘어가면 로그 파일 생성
  path: path.join(__dirname, 'log'),
});

// app.use(morgan('combined', { stream: accessLogStream }));
app.use(
  morgan('combined', {
    stream: accessLogStream,
    skip: (req, res) => res.statusCode < 400,
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('서버가 포트 3000번으로 시작되었습니다.');
});
