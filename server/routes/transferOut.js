const express = require("express");
const router = express();
const connection = require("../lib/db.js");
const runProcedure = require("./index");

// 출고 조회
router.get("/all", (req, res) => {
  const sql = "CALL usp_transfer_out_LST(?,?,?)";
  const params = [
    req.query["transfer_type_id"],
    req.query["part_id"],
    req.query["warehouse_id"],
  ];

  runProcedure(res, sql, params);
});

// 출고 등록
router.get("/create", (req, res) => {
  const sql = "CALL usp_transfer_out_INS(?,?,?,?,?,?,?)";
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

// 출고 삭제
router.delete("/delete", (req, res) => {
  const sql = "CALL usp_transfer_out_DEL(?)";
  const params = [req.query["transfer_out_id"]];

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
