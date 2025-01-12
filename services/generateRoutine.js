const Workout = require("../models/Workout");
const WorkoutRoutine = require("../models/WorkoutRoutine");




async function generateRoutine(kakaoId, selectedExercises, difficulty) {

  if (!kakaoId) {
    throw new Error("kakaoId is required to generate a routine.");
  }

  console.log("kakaoId received in generateRoutine:", kakaoId); // 디버깅 추가


  console.log("Selected Exercises:", selectedExercises); // 선택된 운동 확인

  const workouts = await Workout.find();
  console.log("All workouts from DB:", workouts);


  const routine = {
    kakaoId,
    exercises: [],
    difficulty,
  };


  // 난이도별 설정 값
  const difficultySettings = {
    easy: { multiplier: 1, sets: 2 },
    medium: { multiplier: 1.5, sets: 3 },
    hard: { multiplier: 2, sets: 4 },
  };


  console.log("Routine before saving:", routine); // 디버깅 추가

  // 선택된 운동 가져오기 + 대소문자 구분 x
  //const exercises = await Workout.find({ name: { $in: selectedExercises } });
  const exercises = await Workout.find({
    name: { $in: selectedExercises.map(name => new RegExp(`^${name}$`, "i")) }
  });

  console.log("Found Exercises from DB:", exercises); // DB에서 검색된 운동 확인

  // 난이도 설정
  const multiplier = difficultySettings[difficulty].multiplier;
  const sets = difficultySettings[difficulty].sets;

  
  // **번갈아가며 운동 추가**
  for (let i = 0; i < sets; i++) {
    exercises.forEach((exercise) => {
      routine.exercises.push({
        exerciseId: exercise._id,
        reps: exercise.type === "reps" ? Math.round(exercise.baseReps * multiplier) : null,
        duration: exercise.type === "duration" ? Math.round(exercise.baseDuration * multiplier) : null,
        sets: 1, // 번갈아가며 하나씩 추가하므로 한 세트씩 설정
      });
    });
  }
  
  

  console.log("Routine Exercises:", routine.exercises); // 추가된 운동 확인

  // 루틴 저장
  const newRoutine = new WorkoutRoutine(routine);
  await newRoutine.save();

  return newRoutine;
}

module.exports = generateRoutine;
