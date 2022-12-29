const path = require('path');

console.log(__dirname); // "현재" 파일 경로
console.log(__filename); // "현재" 파일 경로 + 파일명

console.log(path.basename(__filename)); // 파일명
console.log(path.basename(__filename, '.js')); // 파일명에서 확장자 제거

console.log(path.dirname(__filename)); // 파일 경로
console.log(path.dirname('dir1/dir2/dir3/abc.js'));

console.log(path.extname(__filename)); // 파일 확장자

console.log(path.parse(__filename)); // 파일 경로를 분해

const path1 = path.parse('/home/user/dir/file.txt');
console.log(path1);

const path2 = path.format({
  root: '/',
  dir: '/home/user/dir',
  base: 'file.txt',
  ext: '.txt',
  name: 'file',
});
console.log(path2);

const path3 = path.join('/home', 'user', 'dir', 'file.txt');
console.log(path3);
