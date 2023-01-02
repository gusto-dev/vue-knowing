const express = require('express');
const app = express();

require('dotenv').config({ path: 'nodemailer/.env' });
const nodemailer = require('./nodemailer');

app.use(
  express.json({
    limit: '50mb',
  })
);

app.listen(3000, () => {
  console.log('서버가 포트 3000번으로 시작 되었습니다.');
});

app.post('/api/ics', async (req, res) => {
  const event = {
    start: [2022, 6, 30, 9, 30], // 언제부터 년, 월, 일, 시, 분
    duration: { hours: 1, minutes: 30 }, // 얼마나 지속될지 시간, 분
    title: 'node js 스터디 모임', // 제목
    description: 'node js 스터디 모임입니다.', // 설명
    location: '서울시 강남구 역삼동', // 장소
    geo: { lat: 37.497942, lon: 127.027621 }, // 위도, 경도
    url: 'https://www.naver.com', // url
    categories: ['Study', 'Node.js'], // 카테고리
    // status: 'CONFIRMED', // 상태
    organizer: { name: '홍길동', email: 'lhg0616@gmail.com' }, // 주최자
    attendees: [
      // 참석자
      {
        name: '유재석',
        email: '',
        rsvp: true, // 회신여부
        role: 'REQ-PARTICIPANT', // 필수 참석자
      },
      {
        name: '강호동',
        email: '',
        rsvp: true, // 회신여부
        role: 'OPT-PARTICIPANT', // 선택 참석자
      },
    ],
  };

  const r = await nodemailer.sendWithIcs(req.body.param, event);
  res.send(r);
});
