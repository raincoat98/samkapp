const express = require("express");
const router = express();
const { runProcedure } = require("./index");

// 출고
// 조회
router.get("/all", (req, res) => {
  const sql = `CALL usp_transfer_out_LST ()`;

  runProcedure(res, sql);
});

// 등록
router.get("/create", (req, res) => {
  const sql = `CALL usp_transfer_out_INS (${new Array(7)
    .fill("?")
    .toString()})`;
  const params = [
    req.query["transfer_type_id"],
    req.query["plan_date"],
    req.query["priorities"],
    req.query["part_id"],
    req.query["quantity"],
    req.query["warehouse_id"],
    req.query["customer_id"],
  ];

  runProcedure(res, sql, params);
});

// 수정
router.get("/update", (req, res) => {
  const sql = `CALL usp_transfer_out_UPD (${new Array(8)
    .fill("?")
    .toString()})`;
  const params = [
    req.query["transfer_out_id"],
    req.query["transfer_type_id"],
    req.query["priorities"],
    req.query["plan_date"],
    req.query["customer_id"],
    req.query["part_id"],
    req.query["quantity"],
    req.query["warehouse_id"],
  ];

  runProcedure(res, sql, params);
});

// 삭제
router.delete("/delete", (req, res) => {
  const sql = "CALL usp_transfer_out_DEL(?)";
  const params = [req.query["transfer_out_id"]];

  runProcedure(res, sql, params);
});

module.exports = router;
