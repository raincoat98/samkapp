const express = require("express");
const router = express();

const connection = require("../lib/db.js");

// 재고 조회
router.get("/all", (req, res) => {
  const dataList = [];
  const sql = "SELECT * FROM tb_inventory";
  connection.query(sql, function (error, results) {
    if (error) console.log(error);
    else for (let data of results) dataList.push(data);
    res.send({ results });
  });
});

module.exports = router;
