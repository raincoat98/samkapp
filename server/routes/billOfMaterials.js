const express = require("express");
const router = express();
const runProcedure = require("./index");

// 품목 명세서
// 조회
router.get("/all", (req, res) => {
  const sql = "CALL usp_bom_LST(?)";
  const params = [req.query["product_id"]];

  runProcedure(res, sql, params);
});

// 등록
router.get("/create", (req, res) => {
  const sql = `CALL usp_bom_INS (${new Array(7).fill("?").toString()})`;
  const params = [
    req.query["product_id"], // NOT NULL
    req.query["assembly_id"], // NOT NULL
    req.query["unit_id"], // NOT NULL
    req.query["assembly_Qty"], // NOT NULL
    req.query["bom_level"],
    req.query["start_date"], // NOT NULL
    req.query["end_date"],
  ];

  runProcedure(res, sql, params);
});

// 수정
router.get("/update", (req, res) => {
  const sql = `CALL usp_bom_UPD (${new Array(8).fill("?").toString()})`;
  const params = [
    req.query["bom_id"], // NOT NULL
    req.query["product_id"], // NOT NULL
    req.query["assembly_id"], // NOT NULL
    req.query["unit_id"], // NOT NULL
    req.query["assembly_Qty"], // NOT NULL
    req.query["bom_level"],
    req.query["start_date"], // NOT NULL
    req.query["end_date"],
  ];

  runProcedure(res, sql, params);
});

// 삭제
router.get("/delete", (req, res) => {
  res.status(501).send({
    success: false,
  });
  console.log("미구현: 품목 명세서 삭제");
});

module.exports = router;
