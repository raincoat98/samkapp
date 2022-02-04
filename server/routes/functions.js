const express = require("express");
const router = express();
const connection = require("../lib/db.js");

// 품목 재고 가져오기
router.get("/get_qty", (req, res) => {
  const sql = "SELECT fn_get_Qty (?,?)";
  const params = [req.query["inv_month"], req.query["part_id"]];

  try {
    connection.query(sql, params, function (error, results) {
      if (error) console.log(error);
      else console.log("fn_get_Qty ok");

      const data = results[0];
      const key = Object.keys(results[0])[0];
      res.send({ result: data[key] });
    });
  } catch (error) {
    res.error("서버 오류");
  }
});

module.exports = router;
