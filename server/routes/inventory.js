const express = require("express");
const router = express();

const connection = require("../lib/db.js");

// 재고 조회
router.get("/all", (req, res) => {
  const dataList = [];
  const sql = "CALL usp_inventory_LST(?,?)";
  const params = [req.query["part_name"], req.query["warehouse_name"]];

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
