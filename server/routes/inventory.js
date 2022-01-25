const express = require("express");
const router = express();
const runProcedure = require("./index");

// 재고 조회
router.get("/all", (req, res) => {
  const sql = `CALL usp_inventory_LST (${new Array(2).fill("?").toString()})`;
  const params = [req.query["part_name"], req.query["warehouse_name"]];

  runProcedure(res, sql, params);
});

// 등록
router.get("/create", (req, res) => {
  res.status(501).send({
    success: false,
  });
  console.log("미구현: 재고 등록");
});

// 수정
router.get("/update", (req, res) => {
  const sql = `CALL usp_list_price (${new Array(1).fill("?").toString()})`;
  const params = [req.query["work_order_id"]];

  runProcedure(res, sql, params);
});

// 삭제
router.get("/delete", (req, res) => {
  res.status(501).send({
    success: false,
  });
  console.log("미구현: 재고 삭제");
});

module.exports = router;
