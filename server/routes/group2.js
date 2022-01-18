const express = require("express");
const router = express();
const connection = require("../lib/db.js");
const runProcedure = require("./index");

// 품목 분류
// 조회
router.get("/all", (req, res) => {
  const sql = "CALL usp_group_LST ()";

  runProcedure(res, sql);
});

// 품목 분류 등록
router.get("/create", (req, res) => {
  const sql = "CALL usp_group_INS (?,?,?,?,?,?,?,?)";
  const params = [
    req.query["group2_name"], // NOT NULL
    req.query["spec1"],
    req.query["spec2"],
    req.query["spec3"],
    req.query["spec4"],
    req.query["spec5"],
    req.query["search_group"],
    req.query["use_yn"], // NOT NULL
  ];

  runProcedure(res, sql, params);
});

//품목 분류 수정
router.get("/update", (req, res) => {
  const sql = "CALL usp_group_UPD (?,?,?,?,?,?,?,?,?)";
  const params = [
    req.query["group2_id"], // NOT NULL
    req.query["group2_name"],
    req.query["spec1"],
    req.query["spec2"],
    req.query["spec3"],
    req.query["spec4"],
    req.query["spec5"],
    req.query["search_group"],
    req.query["use_yn"],
  ];

  runProcedure(res, sql, params);
});

// 품목 분류 삭제
router.delete("/delete", (req, res) => {
  const sql = "DELETE FROM tb_group2 WHERE group2_id=?";
  const params = [req.query["group2_id"]];

  connection.query(sql, params, function (error, results) {
    if (error) {
      console.log(error);
    } else {
      console.log("delete ok");
    }
    res.send({ results });
  });
});

module.exports = router;
