import Usage from "../models/Usage.js";
import mongoose from "mongoose";




// Add Daily Usage
export const addUsage = async (req, res) => {
  try {
    const { itemId, usedQuantity } = req.body;

    const usage = await Usage.create({
      item: itemId,
      usedQuantity
    });

    res.json(usage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 30 Days Report
export const get30DaysReport = async (req, res) => {
  try {
    const { itemId } = req.params;

    const last30 = new Date();
    last30.setDate(last30.getDate() - 30);

    const report = await Usage.aggregate([
      {
        $match: {
          item: new mongoose.Types.ObjectId(itemId),
          date: { $gte: last30 }
        }
      },
      {
        $group: {
          _id: null,
          totalUsed: { $sum: "$usedQuantity" }
        }
      }
    ]);

    res.json({
      totalUsed: report[0]?.totalUsed || 0
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

