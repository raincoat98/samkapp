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
  const sql =
    "INSERT INTO tb_customer " +
    "(customer_name, business_number, ceo_name, tel, fax, zip_code, address, business_info, item_info, homepage, " +
    "bill_limit_id, customer_group_id, credit_limit, remark, use_yn, crt_id, crt_date, mod_id, mod_date) " +
    "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
    req.query["bill_limit_id"],
    req.query["customer_group_id"],
    req.query["credit_limit"],
    req.query["remark"],
    req.query["use_yn"],
    req.query["crt_id"],
    req.query["crt_date"],
    req.query["mod_id"],
    req.query["mod_date"],
    req.query["customer_id"],
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

//거래처 수정
router.get("/update", (req, res) => {
  const sql =
    "UPDATE tb_customer" +
    "SET customer_name=?, business_number=?, ceo_name=?, tel=?, fax=?, zip_code=?, address=?, business_info=?, item_info=?, homepage=?, " +
    "bill_limit_id=?, customer_group_id=?, credit_limit=?, remark=?, use_yn=?, crt_id=?, crt_date=?, mod_id=?, mod_date=? " +
    "WHERE customer_id=?";
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
    req.query["bill_limit_id"],
    req.query["customer_group_id"],
    req.query["credit_limit"],
    req.query["remark"],
    req.query["use_yn"],
    req.query["crt_id"],
    req.query["crt_date"],
    req.query["mod_id"],
    req.query["mod_date"],
    req.query["customer_id"],
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
