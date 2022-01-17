const express = require("express");
const router = express();

const connection = require("../lib/db.js");

// 품목 형태 조회
router.get("/all", (req, res) => {
  var dataList = [];
  const sql = "SELECT part_type_id, part_type_name, mod_date FROM tb_part_type";
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

// 품목 형태 등록
router.get("/create", (req, res) => {
  const sql =
    "INSERT INTO tb_part_type " +
    "(part_type_id, part_type_name, mod_date)" +
    "VALUES(?, ?, ?)";
  const params = [
    req.query["part_type_id"],
    req.query["part_type_name"],
    req.query["mod_date"],
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

//품목 형태 수정
router.get("/update", (req, res) => {
  const sql =
    "UPDATE tb_part_type" +
    "SET part_type_name=?, mod_date=?" +
    "WHERE part_type_id=?";
  const params = [
    req.query["part_type_name"],
    req.query["mod_date"],
    req.query["part_type_id"],
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

// 품목 형태 삭제
router.delete("/delete", (req, res) => {
  const sql = "DELETE FROM tb_part_type WHERE part_type_id=?";
  const params = [req.query["part_type_id"]];

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
