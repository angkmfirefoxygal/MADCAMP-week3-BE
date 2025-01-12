const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    kakaoId: { type: String, unique: true }, // 카카오 사용자 ID
    email: { type: String, unique: true, sparse: true }, // 이메일
    username: { type: String }, // 사용자 이름 또는 닉네임
    profileImage: { type: String }, // 프로필 이미지 URL 추가
    createdAt: { type: Date, default: Date.now }, // 생성 날짜
  },
  { timestamps: true }
);

const BodySchema = new mongoose.Schema({
    height: { type: Number, required: true, min: 50, max: 300 }, // 키 (cm)
    weight: { type: Number, required: true, min: 10, max: 500 }, // 몸무게 (kg)
})

module.exports = mongoose.model("User", UserSchema);
