const express = require("express");
const bodyParser = require("body-parser");
const { connection } = require("./db");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/assets", express.static(`${__dirname}/public`));

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

app.post("/register", (req, res) => {
  const { email } = req.body;
  connection.query("INSERT INTO users SET ?", { email }, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
  });
  res.redirect("/");
});
