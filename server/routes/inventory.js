const express = require("express");
const router = express();
const { runProcedure, runQuery } = require("./index");

// 재고 조회
router.get("/all", (req, res) => {
  const sql = "CALL usp_inventory_LST ()";

  runProcedure(res, sql);
});

// 등록
router.get("/create", (req, res) => {
  const sql = `CALL usp_inventory_INS (${new Array(5).fill("?").toString()})`;
  const params = [
    req.query["part_id"],
    req.query["lot_no"],
    req.query["quantity"],
    req.query["shelf"],
    req.query["bin"],
  ];

  runProcedure(res, sql, params);
});

// 수정
router.get("/update", (req, res) => {
  const sql = `CALL usp_inventory_UPD3 (${new Array(7).fill("?").toString()})`;
  const params = [
    req.query["part_id"],
    req.query["warehouse_id"],
    req.query["lot_no"],
    req.query["quantity"],
    req.query["shelf"],
    req.query["bin"],
    req.query["status"],
  ];

  runProcedure(res, sql, params);
});

// 삭제
router.delete("/delete", (req, res) => {
  const sql = `CALL usp_inventory_DEL (${new Array(3).fill("?").toString()})`;
  const params = [
    req.query["inv_month"],
    req.query["part_id"],
    req.query["warehouse_id"],
  ];
  runProcedure(res, sql, params);
});

// 뷰
router.get("/view", (req, res) => {
  const sql = "SELECT * FROM v_Inventory";
  runQuery(res, sql);
});

module.exports = router;
