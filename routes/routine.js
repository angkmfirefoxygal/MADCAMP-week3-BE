const express = require("express");
const router = express.Router();
const User = require("../models/User");
const generateRoutine = require("../services/generateRoutine");
const getRoutinesByKakaoId = require("../services/getRoutinesByKakaoId");
const deleteRoutineByKakaoId = require("../services/deleteRoutinesByKakaoId");


// POST /api/routines
router.post("/routines", async (req, res) => {
  try {
    const { kakaoId, selectedExercises, difficulty } = req.body;
    console.log("Request Body:", req.body); // 디버깅 추가

    // 최소 한 가지 운동을 선택했는지 확인
    if (!selectedExercises || selectedExercises.length === 0) {
      return res.status(400).json({ error: "At least one exercise must be selected." });
    }

    // 루틴 생성
    const routine = await generateRoutine(kakaoId, selectedExercises, difficulty);

    res.status(201).json({ message: "Routine created successfully", routine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create routine" });
  }
});

// 루틴 조회
router.get("/routines/:kakaoId", async (req, res) => {
    try {
      const kakaoId = req.params.kakaoId;
      const routines = await getRoutinesByKakaoId(kakaoId);
      res.status(200).json(routines);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch routines" });
    }
});


// 루틴 삭제
router.delete("/routines/:kakaoId/:routineId", async (req, res) => {
    try {
      const { kakaoId, routineId } = req.params;
      const result = await deleteRoutineByKakaoId(kakaoId, routineId);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (err) {
      res.status(500).json({ error: "Failed to delete routine" });
    }
});
  

module.exports = router;
