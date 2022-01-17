const express = require("express");
const router = express();

const connection = require("../lib/db.js");

// 품목 조회
router.get("/all", (req, res) => {
  var dataList = [];
  const sql =
    "SELECT part_id, part_number, part_name, spec1, spec2, spec3, spec4, spec5, part_type_id, group2_id, warehouse_id, " +
    "bom_id, unit_id, standard_cost, list_price, remark, use_yn, " +
    "FROM tb_part";
  connection.query(sql, function (error, results) {
    if (error) {
      console.log(error);
    } else {
      for (var data of results) {
        dataList.push(data);
      }
    }
    res.send({ results });
  });
});

// 품목 등록
router.get("/create", (req, res) => {
  const sql =
    "INSERT INTO tb_part " +
    "(part_number, part_name, spec1, spec2, spec3, spec4, spec5, part_type_id, group2_id, warehouse_id, " +
    "bom_id, unit_id, standard_cost, list_price, remark, use_yn, ) " +
    "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const params = [
    req.query["part_number"],
    req.query["part_name"],
    req.query["spec1"],
    req.query["spec2"],
    req.query["spec3"],
    req.query["spec4"],
    req.query["spec5"],
    req.query["part_type_id"],
    req.query["group2_id"],
    req.query["warehouse_id"],
    req.query["bom_id"],
    req.query["unit_id"],
    req.query["standard_cost"],
    req.query["list_price"],
    req.query["remark"],
    req.query["use_yn"],
  ];

  connection.query(sql, params, function (error, results) {
    if (error) {
      console.log(error);
    } else {
      console.log("insert ok");
    }
    res.send({ results });
  });
});

//품목 수정
router.get("/update", (req, res) => {
  const sql =
    "UPDATE tb_part" +
    "SET part_number=?, part_name=?, spec1=?, spec2=?, spec3=?, spec4=?, spec5=?, part_type_id=?, group2_id=?, warehouse_id=?, " +
    "bom_id=?, unit_id=?, standard_cost=?, list_price=?, remark=?, use_yn=? " +
    "WHERE part_id=?";
  const params = [
    req.query["part_number"],
    req.query["part_name"],
    req.query["spec1"],
    req.query["spec2"],
    req.query["spec3"],
    req.query["spec4"],
    req.query["spec5"],
    req.query["part_type_id"],
    req.query["group2_id"],
    req.query["warehouse_id"],
    req.query["bom_id"],
    req.query["unit_id"],
    req.query["standard_cost"],
    req.query["list_price"],
    req.query["remark"],
    req.query["use_yn"],
    req.query["part_id"],
  ];

  connection.query(sql, params, function (error, results) {
    if (error) {
      console.log(error);
    } else {
      console.log("update ok");
    }
    res.send({ results });
  });
});

// 품목 삭제
router.delete("/delete", (req, res) => {
  const sql = "DELETE FROM tb_part WHERE part_id=?";
  const params = [req.query["part_id"]];

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
