const express = require("express");
const router = express();

const connection = require("../lib/db.js");

// 거래처 조회
router.get("/all", (req, res) => {
  const dataList = [];
  const sql = "CALL usp_customer_LST(?,?,?)";
  const params = [
    req.query["customer_name"],
    req.query["ceo_name"],
    req.query["addr_name"],
  ];

  connection.query(sql, params, function (error, results) {
    if (error) console.log(error);
    else {
      for (let data of results) dataList.push(data);
      console.log("select ok");
    }
    res.send({ results: results[0] });
  });
});

// 거래처 등록
router.get("/create", (req, res) => {
  const sql = "CALL usp_customer_INS(?,?,?,?,?,?,?,?,?,?,?)";
  const params = [
    req.query["customer_name"],
    req.query["business_number"],
    req.query["ceo_name"],
    req.query["tel"],
    req.query["fax"],
    req.query["zip_code"],
    req.query["address"],
    req.query["business_info"],
    req.query["item_info"],
    req.query["homepage"],
    req.query["remark"],
  ];

  connection.query(sql, params, function (error, results) {
    if (error) console.log(error);
    else console.log("insert ok");
    res.send({ results });
  });
});

//거래처 수정
router.get("/update", (req, res) => {
  const sql = "CALL usp_customer_UPD(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  const params = [
    req.query["customer_id"],
    req.query["customer_name"],
    req.query["business_number"],
    req.query["ceo_name"],
    req.query["tel"],
    req.query["fax"],
    req.query["zip_code"],
    req.query["address"],
    req.query["business_info"],
    req.query["item_info"],
    req.query["homepage"],
    req.query["bill_limit_id"],
    req.query["customer_group_id"],
    req.query["credit_limit"],
    req.query["remark"],
  ];

  connection.query(sql, params, function (error, results) {
    if (error) console.log(error);
    else console.log("update ok");
    res.send({ results });
  });
});

// 거래처 삭제
router.delete("/delete", (req, res) => {
  const sql = "DELETE FROM tb_customer WHERE customer_id=?";
  const params = [req.query["customer_id"]];

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
