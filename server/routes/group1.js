const express = require("express");
const router = express();

const connection = require("../lib/db.js");

// 품목분류 1 조회
router.get("/all", (req, res) => {
  const dataList = [];
  const sql = "SELECT * FROM tb_group1";
  connection.query(sql, function (error, results) {
    if (error) console.log(error);
    else for (let data of results) dataList.push(data);
    res.send({ results });
  });
});

module.exports = router;
