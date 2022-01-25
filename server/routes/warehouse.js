const express = require("express");
const router = express();

const connection = require("../lib/db.js");

// 창고
// 조회
router.get("/all", (req, res) => {
  var dataList = [];
  const sql =
    "SELECT warehouse_id, warehouse_name, rack_no, cell_no, row_no, use_yn " +
    "FROM tb_warehouse";
  connection.query(sql, function (error, results) {
    if (error) {
      console.log(error);
    } else {
      for (var data of results) {
        dataList.push(data);
      }
    }
    res.send({ results });
  });
});

// 등록
router.get("/create", (req, res) => {
  const sql =
    "INSERT INTO tb_warehouse " +
    "(warehouse_name, rack_no, cell_no, row_no, use_yn) " +
    "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const params = [
    req.query["warehouse_name"],
    req.query["rack_no"],
    req.query["cell_no"],
    req.query["row_no"],
    req.query["use_yn"],
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

// 수정
router.get("/update", (req, res) => {
  const sql =
    "UPDATE tb_warehouse " +
    "SET warehouse_name=?, rack_no=?, cell_no=?, row_no=?, use_yn=?, " +
    "WHERE warehouse_id=?";

  const params = [
    req.query["warehouse_name"],
    req.query["rack_no"],
    req.query["cell_no"],
    req.query["row_no"],
    req.query["use_yn"],
    req.query["warehouse_id"],
  ];

  connection.query(sql, params, function (error, results) {
    if (error) {
      console.log(error);
    } else {
      console.log("update ok");
    }
    res.send({ results });
  });
});

// 삭제
router.delete("/delete", (req, res) => {
  const sql = "DELETE FROM tb_warehouse WHERE warehouse_id=?";
  const params = [req.query["warehouse_id"]];

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
