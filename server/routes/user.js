const express = require("express");
const router = express();
const runProcedure = require("./index");

const connection = require("../lib/db.js");

router.get("/login", (req, res) => {
  const sql = "CALL fn_user_login(?,?)";
  const params = [req.query["user_id"], req.query["password"]];

  connection.query(sql, params, function (error, results) {
    try {
      if (Object.keys(results[0]).length === 0) throw error;
      else
        res.send({
          result: {
            user_id: results[0][0].user_id,
            name: results[0][0].name,
            privilege: results[0][0].privilege,
          },
        });
      console.log("login ok");
    } catch (error) {
      console.error("login failed");
      res.send(error);
    }
  });
});

router.get("/register", (req, res) => {
  const sql = "CALL fn_user_register(?,?,?)";
  const params = [
    req.query["user_id"],
    req.query["password"],
    req.query["name"],
  ];

  connection.query(sql, params, function (error, results) {
    try {
      if (Object.keys(results[0]).length === 0) throw error;
      else {
        res.send({
          result: {
            user_id: results[0][0].user_id,
            name: results[0][0].name,
            privilege: results[0][0].privilege,
          },
        });
        console.log("register ok");
      }
    } catch (error) {
      console.error("register failed");
      res.send(error);
    }
  });
});

router.get("/all", (req, res) => {
  const sql = "CALL usp_user_LST()";

  runProcedure(res, sql);
});

module.exports = router;
