const express = require("express");
const ejs = require("ejs");
const { connection } = require("./db");

const app = express();

app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`----Listening on PORT: ${PORT}----`));

app.get("/", (req, res) => {
  const query = "SELECT COUNT(*) AS total FROM users";
  connection.query(query, function(error, results, fields) {
    if (error) throw error;
    const totalUsers = results[0].total;
    res.render("home", { totalUsers });
  });
});
