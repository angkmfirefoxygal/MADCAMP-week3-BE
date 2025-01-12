const Routine = require("../models/WorkoutRoutine"); // Routine 모델 불러오기

async function deleteRoutineByKakaoId(kakaoId, routineId) {
  try {
    const result = await Routine.findOneAndDelete({ _id: routineId, kakaoId });

    if (result) {
      console.log(`Routine ${routineId} deleted successfully for Kakao ID ${kakaoId}`);
      return { success: true, message: "Routine deleted successfully" };
    } else {
      console.log(`Routine ${routineId} not found or does not belong to Kakao ID ${kakaoId}`);
      return { success: false, message: "Routine not found or unauthorized" };
    }
  } catch (err) {
    console.error("Error deleting routine:", err);
    throw err;
  }
}

