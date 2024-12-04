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
              const items = await WardrobeController.getMostWornItems(req, res);
              res.json(items);
            } catch (error) {
              console.error("Error fetching most worn items:", error);
              res.status(500).json({ error: "Failed to fetch most worn items." });
            }
        });
        
        // List of items worn less than 2 times
        this.router.get("/least-worn", async (req, res) => {
            try {
              const items = await WardrobeController.getLeastWornItems(req, res);
              res.json(items);
            } catch (error) {
              console.error("Error fetching least worn items:", error);
              res.status(500).json({ error: "Failed to fetch least worn items." });
            }
        });

        // Cost per wear for each item
        this.router.get("/cost-per-wear", async (req, res) => {
            try {
              const costPerWear = await WardrobeController.getCostPerWear(req, res);
              res.json(costPerWear);
            } catch (error) {
              console.error("Error calculating cost per wear:", error);
              res.status(500).json({ error: "Failed to calculate cost per wear." });
            }
        });
        // Wear frequency of items in each category
        // Number of items in each category

    }

    getRouter() {
        return this.router;
    }
}

export default new StatRoutes().getRouter();