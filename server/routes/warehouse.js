const express = require("express");
const router = express();
const { runProcedure } = require("./index");

// 창고
// 조회
router.get("/all", (req, res) => {
  const sql = `CALL usp_warehouse_LST ()`;

  runProcedure(res, sql);
});


// 등록
router.get("/create", (req, res) => {
  const sql = `CALL usp_warehouse_INS (${new Array(5).fill("?").toString()})`;
  const params = [
    req.query["warehouse_name"],
    req.query["rack_no"],
    req.query["cell_no"],
    req.query["row_no"],
    req.query["use_yn"],
  ];

  runProcedure(res, sql, params);
});


// 수정
router.get("/update", (req, res) => {
  const sql = `CALL usp_warehouse_UPD (${new Array(6).fill("?").toString()})`;
  const params = [
    req.query["warehouse_id"],
    req.query["warehouse_name"],
    req.query["rack_no"],
    req.query["cell_no"],
    req.query["row_no"],
    req.query["use_yn"],
  ];

  runProcedure(res, sql, params);
});

// 삭제
router.delete("/delete", (req, res) => {
  const sql = `CALL usp_warehouse_DEL (${new Array(1).fill("?").toString()})`;
  const params = [
    req.query["warehouse_id"],
  ];

  runProcedure(res, sql, params);
});
module.exports = router;
