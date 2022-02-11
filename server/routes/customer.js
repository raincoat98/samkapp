const express = require("express");
const router = express();
const { runProcedure, runQuery } = require("./index");

// 거래처
// 조회
router.get("/all", (req, res) => {
  const sql = `CALL usp_customer_LST (${new Array(3).fill("?").toString()})`;
  const params = [
    req.query["customer_name"],
    req.query["ceo_name"],
    req.query["addr_name"],
  ];

  runProcedure(res, sql, params);
});

// 등록
router.get("/create", (req, res) => {
  const sql = `CALL usp_customer_INS (${new Array(16).fill("?").toString()})`;
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
  const sql = `CALL usp_customer_UPD (${new Array(17).fill("?").toString()})`;
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

// 삭제
router.delete("/delete", (req, res) => {
  const sql = "DELETE FROM tb_customer WHERE customer_id=?";
  const params = [req.query["customer_id"]];

  runQuery(res, sql, params);
});

module.exports = router;
