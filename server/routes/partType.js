const express = require("express");
const router = express();
const { runProcedure } = require("./index");

// 품목 형태 조회
router.get("/all", (req, res) => {
  const sql = "CALL usp_part_type_LST ()";

  runProcedure(res, sql);
});

// 품목 형태 등록
router.get("/create", (req, res) => {
  const sql = `CALL usp_part_type_INS (${new Array(2)
    .fill("?")
    .toString()})`;
  const params = [
    req.query["part_type_id"], // NOT NULL
    req.query["part_type_name"],
  ];

  runProcedure(res, sql, params);
});

//품목 형태 수정
router.get("/update", (req, res) => {
  const sql = `CALL usp_part_type_UPD (${new Array(2)
    .fill("?")
    .toString()})`;
  const params = [
    req.query["part_type_id"], // NOT NULL
    req.query["part_type_name"],
  ];

  runProcedure(res, sql, params);
});

// 품목 형태 삭제
router.delete("/delete", (req, res) => {
  const sql = `CALL usp_part_type_DEL (${new Array(1)
    .fill("?")
    .toString()})`;
  const params = [
    req.query["part_type_id"], // NOT NULL
  ];

  runProcedure(res, sql, params);
});

module.exports = router;
