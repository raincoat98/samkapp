const express = require("express");
const router = express();
const { runProcedure, runQuery } = require("./index");

// 조회
router.get("/all", (req, res) => {
  const sql = "SELECT * FROM tb_product_order";

  runQuery(res, sql);
});

// 등록
router.get("/create", (req, res) => {
  const sql = `CALL usp_product_order_INS (${new Array(5)
    .fill("?")
    .toString()})`;
  const params = [
    req.query["work_order_id"],
    req.query["part_id"],
    req.query["order_quantity"],
    req.query["remark"],
    req.query["due_date"],
  ];

  runProcedure(res, sql, params);
});

// 수정
router.get("/update", (req, res) => {
  const sql = `CALL usp_product_order_UPD (${new Array(3)
    .fill("?")
    .toString()})`;
  const params = [
    req.query["work_order_id"],
    req.query["stocked_quantity"],
    req.query["scrapped_quantity"],
  ];

  runProcedure(res, sql, params);
});

// 삭제
router.get("/delete", (req, res) => {
  res.status(501).send({
    success: false,
  });
  console.log("미구현: 생산 지시 삭제");
});

module.exports = router;
