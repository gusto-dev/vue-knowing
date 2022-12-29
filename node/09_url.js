const myURL = new URL(
  'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'
);

console.log('new URL():', myURL);
console.log(myURL.username);
console.log(myURL.password);

const myURL2 = new URL('https://example.org/?user=abc&pass=123&sort=desc');

const user = myURL2.searchParams.get('user');
const pass = myURL2.searchParams.get('pass');
const sort = myURL2.searchParams.get('sort');

console.log(myURL2.searchParams.keys());
console.log(myURL2.searchParams.values());

myURL2.searchParams.append('user2', 'def'); // 새로운 키값 추가
myURL2.searchParams.append('user', 'def'); // 기존에 같은 키가 있어도 덮어쓰지 않음
console.log(myURL2.searchParams.getAll('user'));

myURL2.searchParams.set('user', 'ghi'); // 기존에 같은 키가 이미 있으면 덮어씀
console.log(myURL2.searchParams.getAll('user'));

myURL2.searchParams.delete('user'); // 키값 삭제
console.log(myURL2.searchParams.getAll('user'));
