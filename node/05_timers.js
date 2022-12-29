const timeout = setTimeout(() => {
  console.log('1초후 timeout');
}, 1000);

const interval = setInterval(() => {
  console.log('1초마다 interval');
}, 1000);

setTimeout(() => {
  clearInterval(interval);
}, 3000);

const immediate = setImmediate(() => {
  console.log(
    'setImmediate 함수 호출 뒤에 오는 모든 코드를 먼저 실행하고 바로 다음에 setImmediate 함수를 실행'
  );
});

console.log('setImmediate 함수 보다 먼저 실행');
