const express = require("express");
const router = express();
const { runQuery } = require("./index");

// 이동 형태
// 조회
router.get("/all", (req, res) => {
  const sql = "SELECT * FROM tb_transfer_type";

  runQuery(res, sql);
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
  res.status(501).send({
    success: false,
  });
  console.log("미구현: 이동 형태 삭제");
});
module.exports = router;
