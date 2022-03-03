const express = require("express");
const router = express();
const { runProcedure } = require("./index");

// 작업지시 조회
router.get("/all", (req, res) => {
  const sql = `CALL usp_work_order_LST ()`;

  runProcedure(res, sql);
});

// 작업지시 등록
router.get("/create", (req, res) => {
  const sql = `CALL usp_work_order_INS (${new Array(6).fill("?").toString()})`;
  const params = [
    req.query["customer_id"],
    req.query["part_id"],
    req.query["quantity"],
    req.query["plan_date"],
    req.query["priorities"],
    req.query["remark"],
  ];

  runProcedure(res, sql, params);
});

//작업지시 수정 (작업 상태만)
router.get("/update", (req, res) => {
  const sql = `CALL usp_order_status_UPD (${new Array(2)
    .fill("?")
    .toString()})`;
  const params = [req.query["work_order_id"], req.query["status"]];

  runProcedure(res, sql, params);
});

// 작업지시 삭제
router.delete("/delete", (req, res) => {
  const sql = "CALL usp_work_order_DEL(?)";
  const params = [req.query["work_order_number"]];

  runProcedure(res, sql, params);
});

module.exports = router;
