const express = require("express");
const router = express();
const { runQuery } = require("./index");

// 품목 재고 가져오기
router.get("/get_qty", (req, res) => {
  const sql = "SELECT fn_get_Qty (?,?)";
  const params = [req.query["inv_month"], req.query["part_id"]];

  runQuery(res, sql, params);
});

module.exports = router;
