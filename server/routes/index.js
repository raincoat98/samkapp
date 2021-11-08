const express = require("express");
const router = express();

const connection = require("../lib/db.js");

router.get("/part", (req, res) => {
  var dataList = [];
  connection.query("SELECT * FROM tb_part", function (error, results, fields) {
    if (error) {
      console.log(error);
    } else {
      for (var data of results) {
        dataList.push(data);
      }
    }
    console.log(dataList);

    res.send({ results });
  });
});

module.exports = router;
