const express = require("express");
const { connection } = require("./db");

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`----Listening on PORT: ${PORT}----`));

app.get("/", (req, res) => res.send("Hello world"));

connection.query("SELECT 1 + 1 AS solution", function(error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results[0].solution);
});

connection.end();
