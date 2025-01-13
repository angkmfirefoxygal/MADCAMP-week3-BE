const express = require("express");
const router = express.Router();
const User = require("../models/User");
const generateRoutine = require("../services/generateRoutine");
const getRoutinesByKakaoId = require("../services/getRoutinesByKakaoId");
const deleteRoutineById = require("../services/deleteRoutinesByKakaoId");


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


// routine 삭제
  
router.delete("/routines/delete", async (req, res) => {
  const kakaoId = req.body.kakaoId; // 요청 본문에서 kakaoId 가져오기
  const routineId = req.body.routineId; // URL에서 routineId 가져오기

  console.log("Headers:", req.headers); // 요청 헤더 확인
  console.log("Body:", req.body); // 요청 본문 확인

  console.log("Received kakaoId:", kakaoId);
  console.log("Received routineId:", routineId);

  if (!kakaoId || !routineId) {
    return res.status(400).json({ message: "Missing kakaoId or routineId" });
  }

  try {
    const result = await deleteRoutineById(kakaoId, routineId);
    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(404).json({ message: result.message });
    }
  } catch (err) {
    console.error("Error deleting routine:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
