const express = require("express");
const router = express();
const runProcedure = require("./index");

// 입고
// 조회
router.get("/all", (req, res) => {
  const sql = `CALL usp_transfer_in_LST (${new Array(3).fill("?").toString()})`;
  const params = [
    req.query["transfer_type_id"],
    req.query["part_id"],
    req.query["warehouse_id"],
  ];

  runProcedure(res, sql, params);
});

// 입고 등록
router.get("/create", (req, res) => {
  const sql = `CALL usp_transfer_in_INS (${new Array(4).fill("?").toString()})`;
  const params = [
    req.query["transfer_type_id"],
    req.query["part_id"],
    req.query["quantity"],
    req.query["warehouse_id"],
  ];

  runProcedure(res, sql, params);
});

//입고 수정
router.get("/update", (req, res) => {
  const sql = `CALL usp_transfer_in_UPD (${new Array(5).fill("?").toString()})`;
  const params = [
    req.query["transfer_in_id"],
    req.query["transfer_type_id"],
    req.query["part_id"],
    req.query["quantity"],
    req.query["warehouse_id"],
  ];

  runProcedure(res, sql, params);
});

// 입고 삭제
router.delete("/delete", (req, res) => {
  const sql = "CALL usp_transfer_in_DEL(?)";
  const params = [req.query["transfer_in_id"]];

  runProcedure(res, sql, params);
});

module.exports = router;
