const express = require("express");
const router = express();
const { runProcedure } = require("./index");

// 이동 형태
// 조회
router.get("/all", (req, res) => {
  const sql = "CALL usp_transfer_type_LST ()";

  runProcedure(res, sql);
});

// 등록
router.get("/create", (req, res) => {
  const sql = `CALL usp_transfer_type_INS (${new Array(3)
    .fill("?")
    .toString()})`;
  const params = [
    req.query["transfer_type_id"], // NOT NULL
    req.query["transfer_type_name"],
    req.query["transfer_flag"],
  ];

  runProcedure(res, sql, params);
});

// 수정
router.get("/update", (req, res) => {
  const sql = `CALL usp_transfer_type_UPD (${new Array(4)
    .fill("?")
    .toString()})`;
  const params = [
    req.query["transfer_type_id"], // NOT NULL
    req.query["transfer_type_name"],
    req.query["transfer_flag"],
    req.query["use_yn"],
  ];

  runProcedure(res, sql, params);
});

// 삭제
router.delete("/delete", (req, res) => {
  const sql = `CALL usp_transfer_type_DEL (${new Array(1)
    .fill("?")
    .toString()})`;
  const params = [
    req.query["transfer_type_id"],
  ];

  runProcedure(res, sql, params);
});
module.exports = router;
