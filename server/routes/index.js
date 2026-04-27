import express from "express";
import {
  createHealthData,
  getAllHealthData,
  calculateRegression,
} from "../controllers/dataController.js";
import { analyzeData } from "../controllers/analysisController.js";
import { healthCheck } from "../controllers/healthController.js";

const router = express.Router();

// Data routes
router.post("/data", createHealthData);
router.get("/data", getAllHealthData);
router.get("/regression", calculateRegression);

// Analysis route
router.post("/analyze", analyzeData);

// Health check route
router.get("/health", healthCheck);

export default router;
