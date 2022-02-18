const express = require("express");
const router = express();
const { runProcedure } = require("./index");

// 단위
// 조회
router.get("/all", (req, res) => {
  const sql = `CALL usp_unit_LST ()`;

  runProcedure(res, sql);
});

// 등록
router.get("/create", (req, res) => {
  const sql = `CALL usp_unit_INS (${new Array(3).fill("?").toString()})`;
  const params = [
    req.query["unit_id"],
    req.query["unit_name_kor"],
    req.query["unit_name_eng"],
  ];

  runProcedure(res, sql, params);
});


// 수정
router.get("/update", (req, res) => {
  const sql = `CALL usp_unit_UPD (${new Array(3).fill("?").toString()})`;
  const params = [
    req.query["unit_id"],
    req.query["unit_name_kor"],
    req.query["unit_name_eng"],
  ];

  runProcedure(res, sql, params);
});

//  삭제
router.delete("/delete", (req, res) => {
  const sql = `CALL usp_unit_DEL (${new Array(1).fill("?").toString()})`;
  const params = [
    req.query["unit_id"],
  ];

  runProcedure(res, sql, params);
});

module.exports = router;
