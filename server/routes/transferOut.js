const express = require("express");
const router = express();

const connection = require("../lib/db.js");

// 출고 조회
router.get("/all", (req, res) => {
  var dataList = [];
  const sql = "CALL usp_transfer_out_LST(?,?,?)";
  const params = [
    req.query["transfer_type_id"],
    req.query["part_id"],
    req.query["warehouse_id"],
  ];

  connection.query(sql, params, function (error, results) {
    if (error) {
      console.log(error);
    } else {
      for (var data of results) {
        dataList.push(data);
      }
    }
    res.send({ results });
    console.log("select ok");
  });
});

// 출고 등록
// http://localhost:3002/transfer-out/all?transfer_type_id=OUT_SALES&part_id=1&warehouse_id=1
router.get("/create", (req, res) => {
  const sql = "CALL usp_transfer_out_INS(?,?,?,?)";
  const params = [
    req.query["transfer_type_id"],
    req.query["part_id"],
    req.query["quantity"],
    req.query["warehouse_id"],
  ];

  connection.query(sql, params, function (error, results) {
    if (error) {
      console.log(error);
    } else {
      console.log("insert ok");
    }
    res.send({ results });
  });
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
