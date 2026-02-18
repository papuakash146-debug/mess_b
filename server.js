import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import itemRoutes from "./routes/itemRoutes.js";
import usageRoutes from "./routes/usageRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors());

app.use("/api/items", itemRoutes);
app.use("/api/usage", usageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

