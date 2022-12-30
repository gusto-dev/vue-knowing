const express = require('express');
const app = express();
const port = 3000;

app.use(
  express.json({
    limit: '50mb', //최대 50mb까지 받겠다
  })
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// 라우터 (주소+http method)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// http://localhost:3000/customers get
app.get('/customers', (req, res) => {
  // db에 있는 고객 정보를 조회하고 클라이언트로 응답
  const customers = [
    { name: 'John Doe', email: 'john@gmail.com' },
    { name: 'Jane Doe', email: 'jane@gmail.com' },
  ];
  res.send(customers);
});

app.get('/customer/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const customers = [
    { id: 1, name: 'John Doe', email: 'john@gmail.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@gmail.com' },
  ];

  const customer = customers.filter((customer) => customer.id === id);
  if (customer.length > 0) res.status(200).send(customer[0]);
  else res.status(404).send('Not Found');
});

app.post('/customer', (req, res) => {
  console.log(req.body.param);

  // db에 저장 코드

  res.send('Ok');
});
