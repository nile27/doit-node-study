const express = require("express");
const app = express();

app.use("/contacts", require("./routes/contactRouter"));

app.listen(3000, () => {
  console.log("서버 실행 중");
});
