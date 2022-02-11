const express = require("express");
const router = express();
const { runQuery } = require("./index");

// 품목 형태 조회
router.get("/all", (req, res) => {
  const sql = "SELECT part_type_id, part_type_name, mod_date FROM tb_part_type";

  runQuery(res, sql);
});

// 품목 형태 등록
router.get("/create", (req, res) => {
  const sql =
    "INSERT INTO tb_part_type " +
    "(part_type_id, part_type_name, mod_date)" +
    "VALUES(?, ?, ?)";
  const params = [
    req.query["part_type_id"],
    req.query["part_type_name"],
    req.query["mod_date"],
  ];

  runQuery(res, sql, params);
});

//품목 형태 수정
router.get("/update", (req, res) => {
  const sql =
    "UPDATE tb_part_type" +
    "SET part_type_name=?, mod_date=?" +
    "WHERE part_type_id=?";
  const params = [
    req.query["part_type_name"],
    req.query["mod_date"],
    req.query["part_type_id"],
  ];

  runQuery(res, sql, params);
});

// 품목 형태 삭제
router.delete("/delete", (req, res) => {
  const sql = "DELETE FROM tb_part_type WHERE part_type_id=?";
  const params = [req.query["part_type_id"]];

  runQuery(res, sql, params);
});

module.exports = router;
