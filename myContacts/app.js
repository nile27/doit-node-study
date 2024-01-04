const express = require("express");
const dbConnect = require("./config/dbConnect");
const bodyParser = require("body-parser");
const app = express();

// ejs view engine 세팅
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./public"));

dbConnect();

app.use(bodyParser.json());
app.use("/contacts", require("./routes/contactRouter"));

app.listen(3000, () => {
  console.log("서버 실행 중");
});
