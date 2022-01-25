const express = require("express");
const router = express();
const runProcedure = require("./index");

// 재고 조회
router.get("/all", (req, res) => {
  const sql = "CALL usp_inventory_LST(?,?)";
  const params = [req.query["part_name"], req.query["warehouse_name"]];

  runProcedure(res, sql, params);
});

// 수정
router.get("/update", (req, res) => {
  const sql = `CALL usp_list_price (${new Array(1).fill("?").toString()})`;
  const params = [req.query["work_order_id"]];

  runProcedure(res, sql, params);
});

module.exports = router;
