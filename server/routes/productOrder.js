const express = require("express");
const router = express();
const { runProcedure } = require("./index");

// 조회
router.get("/all", (req, res) => {
  const sql = `CALL usp_product_order_LST ()`;

  runProcedure(res, sql);
});

// 등록
router.get("/create", (req, res) => {
  const sql = `CALL usp_product_order_INS (${new Array(6)
    .fill("?")
    .toString()})`;
  const params = [
    req.query["part_id"],
    req.query["order_quantity"],
    req.query["work_order_id"],
    req.query["status"],
    req.query["remark"],
    req.query["due_date"],
  ];

  runProcedure(res, sql, params);
});

// 수정
router.get("/update", (req, res) => {
  const sql = `CALL usp_product_order_UPD (${new Array(4)
    .fill("?")
    .toString()})`;
  const params = [
    req.query["prod_order_id"],
    req.query["status"],
    req.query["stocked_quantity"],
    req.query["scrapped_quantity"],
  ];

  runProcedure(res, sql, params);
});

// 삭제
router.delete("/delete", (req, res) => {
  const sql = `CALL usp_product_order_DEL (${new Array(1)
    .fill("?")
    .toString()})`;
  const params = [req.query["prod_order_id"]];

  runProcedure(res, sql, params);
});

module.exports = router;
