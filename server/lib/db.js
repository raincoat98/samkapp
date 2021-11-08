var mysql = require("mysql"); // mysql 변수에 mysql 모듈을 할당
var connection = mysql.createConnection({
  //커넥션변수에 mysql변수에 있는 크리에이드커넥션 메소드를 호출(객체를 받음) 할당
  host: "localhost", //host객체 - 마리아DB가 존재하는 서버의 주소
  user: "esamter", //user객체 - 마리아DB의 계정
  password: "esamter1!", //password객체 - 마리아DB 계정의 비밀번호
  port: "3308",
  database: "inv", //database객체 - 접속 후 사용할 DB명
});
module.exports = connection;
