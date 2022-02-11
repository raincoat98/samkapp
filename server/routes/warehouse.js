const express = require("express");
const router = express();
const { runQuery } = require("./index");

// 창고
// 조회
router.get("/all", (req, res) => {
  const sql =
    "SELECT warehouse_id, warehouse_name, rack_no, cell_no, row_no, use_yn " +
    "FROM tb_warehouse";

  runQuery(res, sql, undefined);
});

// 등록
router.get("/create", (req, res) => {
  const sql =
    "INSERT INTO tb_warehouse " +
    "(warehouse_name, rack_no, cell_no, row_no, use_yn) " +
    "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const params = [
    req.query["warehouse_name"],
    req.query["rack_no"],
    req.query["cell_no"],
    req.query["row_no"],
    req.query["use_yn"],
  ];

  runQuery(res, sql, params);
});

// 수정
router.get("/update", (req, res) => {
  const sql =
    "UPDATE tb_warehouse " +
    "SET warehouse_name=?, rack_no=?, cell_no=?, row_no=?, use_yn=? " +
    "WHERE warehouse_id=?";

  const params = [
    req.query["warehouse_name"],
    req.query["rack_no"],
    req.query["cell_no"],
    req.query["row_no"],
    req.query["use_yn"],
    req.query["warehouse_id"],
  ];

  runQuery(res, sql, params);
});

// 삭제
router.delete("/delete", (req, res) => {
  const sql = "DELETE FROM tb_warehouse WHERE warehouse_id=?";
  const params = [req.query["warehouse_id"]];

  runQuery(res, sql, params);
});

module.exports = router;
