const express = require("express");
const router = express();
const runProcedure = require("./index");

// 품목 가격 조회
router.get("/all", (req, res) => {
  const dataList = [];
  const sql = "CALL usp_list_price_LST(?)";
  const params = [req.query["part_name"]];

  runProcedure(res, sql, params);
});

module.exports = router;
