const express = require("express");
const connection = require("../lib/db.js");
const router = express();

// 조회
router.get("/all", (req, res) => {
  const sql = "SELECT * FROM tb_product_order";

  try {
    connection.query(sql, function (error, results) {
      if (error) throw error;
      res.send({ results });
      console.log("select ok");
    });
  } catch (error) {
    res.send(error);
    console.log("select failed");
  }
});

// 등록
router.get("/create", (req, res) => {
  const sql = "CALL usp_product_order_INS(?,?,?,?,?)";
  const params = [
    req.query["work_order_id"],
    req.query["part_id"],
    req.query["order_quantity"],
    req.query["remark"],
    req.query["due_date"],
  ];

  try {
    connection.query(sql, params, function (error, results) {
      if (error) throw error;
      res.send({ results });
      console.log("insert ok");
    });
  } catch (error) {
    res.send(error);
    console.log("insert failed");
  }
});

// 수정
router.get("/update", (req, res) => {
  const sql = "CALL usp_product_order_UPD(?,?,?,?)";
  const params = [
    req.query["work_order_id"],
    req.query["stocked_quantity"],
    req.query["scrapped_quantity"],
    req.query["end_date"],
  ];

  try {
    connection.query(sql, params, function (error, results) {
      if (error) throw error;
      res.send({ results });
      console.log("update ok");
    });
  } catch (error) {
    res.send(error);
    console.log("update failed");
  }
});

module.exports = router;
