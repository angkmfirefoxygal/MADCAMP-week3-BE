const mongoose = require('../config/db'); // db.js 가져오기
const User = require("../models/User");

const routineSchema = new mongoose.Schema({
    kakaoId: { type: String, required: true, ref: "User" }, // 카카오 ID로 사용자 참조
    exercises: [
      {
        exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: "Workout" },
        reps: { type: Number }, // 반복 횟수
        duration: { type: Number }, // 지속 시간 (초)
        sets: { type: Number }, // 세트 수
      },
    ],
    difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true }, // 난이도
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model("Routine", routineSchema);
  