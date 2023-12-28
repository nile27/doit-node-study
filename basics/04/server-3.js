// 응답 객체 확인하기 - 응답 헤더, 응답 본문, 응답 종료  (결과 비교 파일 : 04\results\server-3.js)

const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-type", "text/plain"); //응답 헤더 표시 (단순 텍스트 파일이라는 뜻)
  res.write("hello Node"); //응답 데이터 화면에 표시해줌
  res.end(); // 응답 끝
});

server.listen(3000, () => {
  console.log("서버 실행 중");
});
