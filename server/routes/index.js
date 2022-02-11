const connection = require("../lib/db.js");

function runProcedure(res, sql, params) {
  const query = combineQueryAndParams(sql, params);

  try {
    console.log(`Procedure started: ${query}`);

    connection.query(sql, params, (error, results) => {
      if (error) throw error;
      res.send({ results: results[0] });
      console.log(`Procedure succeed: ${query}`);
    });
  } catch (error) {
    res.send(error);
    console.error(`Procedure failed: ${query}`);
  }
}

function runQuery(res, sql, params) {
  const query = combineQueryAndParams(sql, params);

  try {
    console.log(`Query started: ${query}`);

    connection.query(sql, params, (error, results) => {
      if (error) throw error;
      res.send({ results });
      console.log(`Query succeed: ${query}`);
    });
  } catch (error) {
    res.send(error);
    console.error(`Query failed: ${query}`);
  }
}

module.exports = {
  runProcedure,
  runQuery,
};

function combineQueryAndParams(sql, params) {
  let query = sql;
  try {
    if (Array.isArray(params)) {
      for (let index = 0; index < params.length; index++) {
        query = query.replace("?", params[index]);
      }
    }
  } catch (error) {
    console.error(error);
  }
  return query;
}
