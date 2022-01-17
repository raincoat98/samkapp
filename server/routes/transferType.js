const express = require("express");
const router = express();

const connection = require("../lib/db.js");

// 이동 형태 조회
router.get("/all", (req, res) => {
  const dataList = [];
  const sql = "SELECT * FROM tb_transfer_type";
  connection.query(sql, function (error, results) {
    if (error) console.log(error);
    else for (let data of results) dataList.push(data);
    res.send({ results });
  });
});

module.exports = router;
