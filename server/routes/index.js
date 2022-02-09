const connection = require("../lib/db.js");

function runProcedure(res, sql, params) {
  try {
    connection.query(sql, params, (error, results) => {
      if (error) throw error;
      res.send({ results: results[0] });
      console.log(`procedure ok, sql: ${sql}, params: "${params}"`);
    });
  } catch (error) {
    res.send(error);
    console.error(`procedure failed:, sql: ${sql}, params: "${params}"`);
  }
}

module.exports = runProcedure;
