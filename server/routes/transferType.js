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
  res.status(501).send({
    success: false,
  });
  console.log("미구현: 이동 형태 등록");
});

// 수정
router.get("/update", (req, res) => {
  res.status(501).send({
    success: false,
  });
  console.log("미구현: 이동 형태 수정");
});

// 삭제
router.delete("/delete", (req, res) => {
  const sql = `CALL usp_transfer_type_DEL (${new Array(1).fill("?").toString()})`;
  const params = [
    req.query["transfer_type_id"],
  ];

  runProcedure(res, sql, params);
});
module.exports = router;
