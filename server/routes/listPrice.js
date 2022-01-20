const express = require("express");
const router = express();
const runProcedure = require("./index");

// 품목 가격
// 조회
router.get("/all", (req, res) => {
  const sql = "CALL usp_list_price_LST(?)";
  const params = [req.query["part_name"]];

  runProcedure(res, sql, params);
});

// 등록
router.get("/create", (req, res) => {
  const sql = `CALL usp_list_price (${new Array(4).fill("?").toString()})`;
  const params = [
    req.query["part_id"],
    req.query["list_price"],
    req.query["start_date"],
    req.query["end_date"],
  ];

  runProcedure(res, sql, params);
});

// 수정
router.get("/update", (req, res) => {
  const sql = `CALL usp_list_price (${new Array(4).fill("?").toString()})`;
  const params = [
    req.query["part_id"],
    req.query["list_price"],
    req.query["start_date"],
    req.query["end_date"],
  ];

  runProcedure(res, sql, params);
});

module.exports = router;
