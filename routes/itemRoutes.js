import express from "express";
import {
  addItem,
  getItems,
  getStockSummary
} from "../controllers/itemController.js";

const router = express.Router();

router.post("/", addItem);
router.get("/", getItems);
router.get("/summary", getStockSummary);

export default router;
