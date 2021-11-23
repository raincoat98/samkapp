const express = require("express");
const router = express();

const connection = require("../lib/db.js");

router.get("/", (req, res) => {
  var dataList = [];
  connection.query(
    "SELECT * FROM tb_admin where admin_id = ? AND password = ?",
    [req.query.id, req.query.password],
    function (error, results) {
      if (error) {
      } else {
        for (var data of results) {
          dataList.push(data);
        }
      }
      res.send({ results });
    }
  );
});

module.exports = router;
