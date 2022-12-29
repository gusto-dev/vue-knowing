const os = require('os');

console.log(os.arch()); // CPU 아키텍처 정보
console.log(os.cpus()); // 컴퓨터의 코어 정보
console.log(os.type()); // 운영체제 종류
console.log(os.platform()); // 운영체제 플랫폼
console.log(os.hostname()); // 컴퓨터 이름
console.log(os.homedir()); // 홈 디렉터리 경로
console.log(os.tmpdir()); // 임시 파일 저장 경로
