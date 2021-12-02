const express = require("express");
const router = express();

const connection = require("../lib/db.js");

// 작업지시 조회
router.get("/all", (req, res) => {
  var dataList = [];
  const sql = "CALL usp_work_order_LST(?,?,?)";
  const params = [
    req.query["mod_date"],
    req.query["part_id"],
    req.query["customer_id"],
  ];

  connection.query(sql, params, function (error, results) {
    if (error) {
      throw error;
    } else {
      for (var data of results) {
        dataList.push(data);
      }
    }
    res.send({ results });
    console.log("select ok");
  });
});

// 작업지시 등록
// http://localhost:3002/work-order/create?customer_id=1&part_id=1&quantity=1000&plan_date=20211201&priorities=0&remark=REMARK
// call inv.usp_work_order_INS('1','1',1000,'20211201',0,'REMARK');
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

  connection.query(sql, params, function (error, results) {
    if (error) {
      throw error;
    }
    console.log("insert ok");
  });
});

//작업지시 수정
router.get("/update", (req, res) => {
  const sql = "CALL usp_work_order_UPD(?,?,?,?,?,?)";
  const params = [
    req.query["part_id"],
    req.query["customer_id"],
    req.query["quantity"],
    req.query["plan_date"],
    req.query["priorities"],
    req.query["remark"],
  ];

  connection.query(sql, params, function (error, results) {
    if (error) {
      throw error;
    }
    console.log("update ok");
  });
});

// 작업지시 삭제
router.delete("/delete", (req, res) => {
  const sql = "CALL usp_work_order_DEL(?)";
  const params = [req.query["work_order_number"]];

  connection.query(sql, params, function (error, results) {
    if (error) {
      throw error;
    }
    console.log("delete ok");
  });
});

module.exports = router;
