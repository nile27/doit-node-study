require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const expressLayout = require("express-ejs-layouts");
const connectDb = require("./config/db");

const app = express();
const port = process.env.PORT || 3000;

connectDb();

app.use(expressLayout);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", require("./routes/main"));

app.listen(port, () => {
  console.log(`starting server port:${port}`);
});
