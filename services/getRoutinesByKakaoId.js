const Routine = require("../models/WorkoutRoutine"); // Routine 모델 불러오기
const User = require("../models/User");





async function getRoutinesByKakaoId(kakaoId) {
  try {
    console.log(`KakaoId used for query: ${kakaoId}`);

    // Populate 참조 데이터 가져오기
    const routines = await Routine.find({ kakaoId }).populate("exercises.exerciseId");
    
    if (!routines || routines.length === 0) {
      console.log(`No routines found for kakaoId: ${kakaoId}`);
      return [];
    }

    console.log("Populated Routines:", routines);
    return routines;
  } catch (err) {
    console.error("Error fetching routines:", err);
    throw err;
  }
}

module.exports = getRoutinesByKakaoId;
