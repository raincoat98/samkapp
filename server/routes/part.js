const express = require("express");
const router = express();
const { runProcedure } = require("./index");

// 품목
// 조회
router.get("/all", (req, res) => {
  const sql = "CALL usp_part_LST (?)";
  const params = [req.query["group_id"]];

  runProcedure(res, sql, params);
});

// 품목 등록
router.get("/create", (req, res) => {
  const sql = `CALL usp_part_INS (${new Array(15).fill("?").toString()})`;
  const params = [
    req.query["part_name"], // NOT NULL
    req.query["spec1"],
    req.query["spec2"],
    req.query["spec3"],
    req.query["spec4"],
    req.query["spec5"],
    req.query["part_type_id"], // NOT NULL
    req.query["group2_id"], // NOT NULL
    req.query["warehouse_id"],
    req.query["bom_id"],
    req.query["unit_id"],
    req.query["standard_cost"],
    req.query["list_price"],
    req.query["remark"],
    req.query["use_yn"], // NOT NULL
  ];

  runProcedure(res, sql, params);
});

//품목 수정
router.get("/update", (req, res) => {
  const sql = `CALL usp_part_UPD (${new Array(17).fill("?").toString()})`;
  const params = [
    req.query["part_id"], // NOT NULL
    req.query["part_number"], // NOT NULL
    req.query["part_name"], // NOT NULL
    req.query["spec1"],
    req.query["spec2"],
    req.query["spec3"],
    req.query["spec4"],
    req.query["spec5"],
    req.query["part_type_id"], // NOT NULL
    req.query["group2_id"], // NOT NULL
    req.query["warehouse_id"],
    req.query["bom_id"],
    req.query["unit_id"],
    req.query["standard_cost"],
    req.query["list_price"],
    req.query["remark"],
    req.query["use_yn"], // NOT NULL
  ];

  runProcedure(res, sql, params);
});

// 품목 삭제
router.delete("/delete", (req, res) => {
  const sql = `CALL usp_part_DEL (${new Array(1).fill("?").toString()})`;
  const params = [
    req.query["part_id"], // NOT NULL
  ];
  runProcedure(res, sql, params);
});

module.exports = router;
