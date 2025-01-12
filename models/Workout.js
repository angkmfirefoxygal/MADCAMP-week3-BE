const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true }, // 운동 이름 (예: squat)
  type: { type: String, enum: ["reps", "duration"], required: true }, // 유형 (반복 or 시간)
  baseReps: { type: Number, default: 10 }, // 기본 반복 횟수
  baseDuration: { type: Number, default: 30 }, // 기본 지속 시간 (초)
});

module.exports = mongoose.model("Workout", exerciseSchema);
