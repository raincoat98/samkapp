const express = require("express");
const router = express();
const { runQuery } = require("./index");

// 단위
// 조회
router.get("/all", (req, res) => {
  const sql = "SELECT unit_id, unit_name_kor, unit_name_eng FROM tb_unit";

  runQuery(res, sql);
});

// 등록
router.get("/create", (req, res) => {
  const sql =
    "INSERT INTO tb_unit " + "(unit_id, unit_name_kor, unit_name_eng " + "VALUES(?, ?, ?);";
  const params = [req.query["unit_id"], req.query["unit_name_kor"], req.query["unit_name_eng"]];

  runQuery(res, sql, params);
});

// 수정
router.get("/update", (req, res) => {
  const sql = "UPDATE tb_unit SET unit_name=?, mod_date=? WHERE unit_id=?";
  const params = [
    req.query["unit_name"],
    req.query["mod_date"],
    req.query["unit_id"],
  ];

  runQuery(res, sql, params);
});

//  삭제
router.delete("/delete", (req, res) => {
  const sql = "DELETE FROM tb_unit WHERE unit_id=?";
  const params = [req.query["unit_id"]];

  runQuery(res, sql, params);
});

module.exports = router;
