const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "전화번호를 기입해 주세요"],
      // [필수 요소 참/거짓, 없을 경우 에러 메세지]
    },
  },
  {
    // creatAt, updateAt 등 시간 자동 기록
    timestamps: true,
  }
);

// 스키마 -> 모델 || mongoose.model(모델명, 스키마명)
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
