const express = require("express");
const router = express();

const connection = require("../lib/db.js");

// 품목 가격 조회
router.get("/all", (req, res) => {
  const dataList = [];
  const sql = "CALL usp_list_price_LST(?)";
  const params = [req.query["part_name"]];

  connection.query(sql, params, function (error, results) {
    if (error) console.log(error);
    else {
      for (let data of results) dataList.push(data);
      console.log("select ok");
    }
    res.send({ results: results[0] });
  });
});

module.exports = router;
