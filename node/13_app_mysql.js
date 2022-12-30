const express = require('express');
const app = express();
const port = 3000;
const mysql = require('./mysql');

app.use(
  express.json({
    limit: '50mb',
  })
);

app.listen(port, () => {
  console.log('서버가 포트 3000번으로 시작되었습니다.');
});

app.get('/api/products', async (req, res) => {
  const productList = await mysql.query('productList');
  res.send(productList);
});
