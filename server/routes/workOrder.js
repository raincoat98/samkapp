const express = require("express");
const router = express();
const connection = require("../lib/db.js");
const runProcedure = require("./index");

// 작업지시 조회
router.get("/all", (req, res) => {
  const sql = "CALL usp_work_order_LST(?,?,?)";
  const params = [
    req.query["mod_date"],
    req.query["part_id"],
    req.query["customer_id"],
  ];

  runProcedure(res, sql, params);
});

// 작업지시 등록
router.get("/create", (req, res) => {
  const sql = "CALL usp_work_order_INS(?,?,?,?,?,?)";
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
  const sql = "CALL usp_order_status_UPD(?,?)";
  const params = [req.query["work_order_id"], req.query["status"]];

  runProcedure(res, sql, params);
});

// 작업지시 삭제
router.delete("/delete", (req, res) => {
  const sql = "CALL usp_work_order_DEL(?)";
  const params = [req.query["work_order_number"]];

  connection.query(sql, params, function (error, results) {
    if (error) {
      console.log(error);
    } else {
      console.log("delete ok");
    }
    res.send({ results });
  });
});

module.exports = router;
