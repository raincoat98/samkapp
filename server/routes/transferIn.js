const express = require("express");
const router = express();

const connection = require("../lib/db.js");

// 입고 조회
router.get("/all", (req, res) => {
  var dataList = [];
  const sql = "SELECT * FROM tb_transfer_in";
  connection.query(sql, function (error, results) {
    if (error) {
      throw error;
    } else {
      for (var data of results) {
        dataList.push(data);
      }
    }
    res.send({ results });
  });
});

// 입고 등록
// http://localhost:3002/transfer-in/create?transfer_type_id=IN_BUY&part_id=2&quantity=1600&warehouse_id=1
// mariadb call - CALL usp_transfer_in_INS('IN_BUY','1',1200, 1)
router.get("/create", (req, res) => {
  const sql = "CALL usp_transfer_in_INS(?,?,?,?)";
  const params = [
    req.query["transfer_type_id"],
    req.query["part_id"],
    req.query["quantity"],
    req.query["warehouse_id"],
  ];

  connection.query(sql, params, function (error, results) {
    if (error) {
      throw error;
    }
    console.log("insert ok");
  });
});

//입고 수정
router.get("/update", (req, res) => {
  const sql = "CALL usp_transfer_in_UPD(?,?,?,?,?)";
  const params = [
    req.query["transfer_type_id"],
    req.query["part_id"],
    req.query["quantity"],
    req.query["warehouse_id"],
    req.query["work_order_id"],
  ];

  connection.query(sql, params, function (error, results) {
    if (error) {
      throw error;
    }
    console.log("update ok");
  });
});

// 입고 삭제
router.delete("/delete", (req, res) => {
  const sql = "CALL usp_transfer_in_DEL(?)";
  const params = [req.query["transfer_in_id"]];

  connection.query(sql, params, function (error, results) {
    if (error) {
      throw error;
    }
    console.log("delete ok");
  });
});

module.exports = router;
