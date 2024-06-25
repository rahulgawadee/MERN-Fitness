const express = require("express");
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

const requireAuth= require('../middleware/requireAuth')



const router = express.Router();

router.use(requireAuth)

// ata jovar user login karat nahi tovar data disnar nahi.. requireAuth mulee


// GET all workouts
router.get("/", getWorkouts);

// POST a new workout
router.post("/", createWorkout);

// GET a single workout
router.get("/:id", getWorkout);

// DELETE a workout
router.delete("/:id", deleteWorkout);

// UPDATE a workout
router.patch("/:id", updateWorkout);

module.exports = router;
