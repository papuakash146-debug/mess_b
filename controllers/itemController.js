import Item from "../models/Item.js";
import Usage from "../models/Usage.js";
import mongoose from "mongoose";

// Add Item
export const addItem = async (req, res) => {
  try {
    const { name, totalQuantity, unit } = req.body;

    const item = await Item.create({
      name,
      totalQuantity,
      unit
    });

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Items
export const getItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

// Stock Summary
export const getStockSummary = async (req, res) => {
  try {
    const items = await Item.find();

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const summary = await Promise.all(
      items.map(async (item) => {
        const todayUsage = await Usage.aggregate([
          {
            $match: {
              item: item._id,
              date: { $gte: todayStart }
            }
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$usedQuantity" }
            }
          }
        ]);

        const todayUsed = todayUsage[0]?.total || 0;

        return {
          itemName: item.name,
          totalQuantity: item.totalQuantity,
          todayUsed,
          remaining: item.totalQuantity - todayUsed
        };
      })
    );

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
