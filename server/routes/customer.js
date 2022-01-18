const express = require("express");
const router = express();
const connection = require("../lib/db.js");
const runProcedure = require("./index");

// 거래처
// 조회
router.get("/all", (req, res) => {
  const sql = "CALL usp_customer_LST(?,?,?)";
  const params = [
    req.query["customer_name"],
    req.query["ceo_name"],
    req.query["addr_name"],
  ];

  runProcedure(res, sql, params);
});

// 등록
router.get("/create", (req, res) => {
  const sql = "CALL usp_customer_INS(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  const params = [
    req.query["customer_name"], // NOT NULL
    req.query["business_number"],
    req.query["ceo_name"], // NOT NULL
    req.query["tel"], // NOT NULL
    req.query["fax"],
    req.query["zip_code"], // NOT NULL
    req.query["address"], // NOT NULL
    req.query["business_info"],
    req.query["item_info"],
    req.query["homepage"],
    req.query["person_charge"],
    req.query["position"],
    req.query["person_info1"],
    req.query["person_info2"],
    req.query["email"],
    req.query["remark"],
  ];

  runProcedure(res, sql, params);
});

// 수정
router.get("/update", (req, res) => {
  const sql = "CALL usp_customer_UPD(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
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
    req.query["person_charge"],
    req.query["position"],
    req.query["person_info1"],
    req.query["person_info2"],
    req.query["email"],
    req.query["remark"],
  ];

  runProcedure(res, sql, params);
});

// 거래처 삭제
router.delete("/delete", (req, res) => {
  const sql = "DELETE FROM tb_customer WHERE customer_id=?";
  const params = [req.query["customer_id"]];

  try {
    connection.query(sql, params, (error, results) => {
      if (error) throw error;
      res.send({ results });
      console.log("delete ok");
    });
  } catch (error) {
    res.send(error);
    console.log("delete failed");
  }
});

module.exports = router;
