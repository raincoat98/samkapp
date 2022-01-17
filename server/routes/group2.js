const express = require("express");
const router = express();

const connection = require("../lib/db.js");

// 품목 분류 조회
router.get("/all", (req, res) => {
  var dataList = [];
  const sql =
    "SELECT group2_id, group2_name, spec1, spec2, spec3, spec4, spec5, " +
    "search_group, use_yn FROM tb_group2";
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

// 품목 분류 등록
router.get("/create", (req, res) => {
  const sql =
    "INSERT INTO tb_group2 (group2_name, spec1, spec2, spec3, spec4, spec5, " +
    "search_group, use_yn)" +
    "VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
  const params = [
    req.query["group2_name"],
    req.query["spec1"],
    req.query["spec2"],
    req.query["spec3"],
    req.query["spec4"],
    req.query["spec5"],
    req.query["search_group"],
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

//품목 분류 수정
router.get("/update", (req, res) => {
  const sql =
    "UPDATE tb_group2" +
    "SET group2_name=?, spec1=?, spec2=?, spec3=?, spec4=?, spec5=?, " +
    "search_group=?, use_yn=?" +
    "WHERE group2_id=?";
  const params = [
    req.query["group2_name"],
    req.query["spec1"],
    req.query["spec2"],
    req.query["spec3"],
    req.query["spec4"],
    req.query["spec5"],
    req.query["search_group"],
    req.query["use_yn"],
    req.query["group2_id"],
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
