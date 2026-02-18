import express from "express";
import {
  addUsage,
  get30DaysReport
} from "../controllers/usageController.js";

const router = express.Router();

router.post("/", addUsage);
router.get("/report/:itemId", get30DaysReport);

export default router;
