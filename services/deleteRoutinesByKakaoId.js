const Routine = require("../models/WorkoutRoutine"); // Routine 모델 불러오기
//const mongoose = require('../config/db'); // db.js 가져오기
const mongoose = require("mongoose");


/**
 * 특정 사용자(`kakaoId`)의 `routines` 배열에서 `_id`로 항목 삭제
 * @param {string} kakaoId - 사용자의 Kakao ID
 * @param {string} routineId - 삭제할 루틴의 _id
 */




async function deleteRoutineById(kakaoId, routineId) {
  try {
    const routineObjectId = new mongoose.Types.ObjectId(routineId);

    // MongoDB 쿼리 실행
    const result = await Routine.deleteOne({ kakaoId, _id: routineObjectId });

    if (result.deletedCount > 0) {
      console.log(`Routine ${routineId} deleted successfully for Kakao ID ${kakaoId}`);
      return { success: true, message: "Routine deleted successfully" };
    } else {
      console.log(`Routine ${routineId} not found for Kakao ID ${kakaoId}`);
      return { success: false, message: "Routine not found or unauthorized" };
    }
  } catch (err) {
    console.error("Error deleting routine:", err);
    throw err;
  }
}


module.exports = deleteRoutineById;

