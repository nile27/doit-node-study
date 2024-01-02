const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();

dbConnect();

app.use("/contacts", require("./routes/contactRouter"));

app.listen(3000, () => {
  console.log("서버 실행 중");
});
