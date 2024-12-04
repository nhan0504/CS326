
// List of items worn less than 2 times
// Cost per wear for each item
// Wear frequency of items in each category
// Number of items in each category

import express from "express";
import WardrobeController from "../controller/WardrobeController.js";

class StatRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        // Top 5 most worn items
        this.router.get("/most-worn", async (req, res) => {
            try {
              const userId = req.user.googleId;

              const items = await WardrobeController.getMostWornItems(req, res);
              res.json(items);
            } catch (error) {
              console.error("Error fetching most worn items:", error);
              res.status(500).json({ error: "Failed to fetch most worn items." });
            }
        });


    }

    getRouter() {
        return this.router;
    }
}

export default new StatRoutes().getRouter();