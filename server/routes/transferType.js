const express = require("express");
const router = express();
const { runQuery } = require("./index");

// 이동 형태 조회
router.get("/all", (req, res) => {
  const sql = "SELECT * FROM tb_transfer_type";

  runQuery(res, sql);
});

module.exports = router;
