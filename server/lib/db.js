const DB_CONFIG = require("./config");

const mysql = require("mysql"); // mysql 변수에 mysql 모듈을 할당

const pool = mysql.createPool({
  host: DB_CONFIG.host, //host객체 - 마리아DB가 존재하는 서버의 주소
  user: DB_CONFIG.user, //user객체 - 마리아DB의 계정
  password: DB_CONFIG.password, //password객체 - 마리아DB 계정의 비밀번호
  port: DB_CONFIG.port,
  database: DB_CONFIG.database, //database객체 - 접속 후 사용할 DB명
});

module.exports = pool;
