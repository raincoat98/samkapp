const express = require("express");
const router = express();

const connection = require("../lib/db.js");

// 품목 가격 조회
router.get("/all", (req, res) => {
  var dataList = [];
  const sql = "SELECT unit_id, unit_name, mod_date FROM tb_unit";
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

// 품목 가격 등록
router.get("/create", (req, res) => {
  const sql =
    "INSERT INTO tb_unit " +
    "(unit_id, unit_name, mod_date) " +
    "VALUES(?, ?, ?);";
  const params = [
    req.query["unit_id"],
    req.query["unit_name"],
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

//품목 가격 수정
router.get("/update", (req, res) => {
  const sql = "UPDATE tb_unit SET unit_name=?, mod_date=? WHERE unit_id=?";
  const params = [
    req.query["unit_name"],
    req.query["mod_date"],
    req.query["unit_id"],
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

// 품목 가격 삭제
router.delete("/delete", (req, res) => {
  const sql = "DELETE FROM tb_unit WHERE unit_id=?";
  const params = [req.query["unit_id"]];

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
