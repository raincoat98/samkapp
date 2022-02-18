const express = require("express");
const router = express();
const { runProcedure } = require("./index");

// 재고 조회
router.get("/all", (req, res) => {
  const sql = `CALL usp_inventory_LST (${new Array(2).fill("?").toString()})`;
  const params = [req.query["part_name"], req.query["warehouse_name"]];

  runProcedure(res, sql, params);
});

// 등록
router.get("/create", (req, res) => {
  const sql = `CALL usp_inventory_INS (${new Array(6).fill("?").toString()})`;
  const params = [
    req.query["part_id"],
    req.query["warehouse_id"],
    req.query["lot_no"],
    req.query["qty"],
    req.query["shelf"],
    req.query["bin"],
  ];

  runProcedure(res, sql, params);
});

// 수정
router.get("/update", (req, res) => {
  const sql = `CALL usp_inventory_UPD3 (${new Array(4).fill("?").toString()})`;
  const params = [
    req.query["part_id"],
    req.query["warehouse_id"],
    req.query["qty"],
    req.query["status"],
  ];

  runProcedure(res, sql, params);
});

// 삭제
router.delete("/delete", (req, res) => {
  res.status(501).send({
    success: false,
  });
  console.log("미구현: 재고 삭제");
});

module.exports = router;
