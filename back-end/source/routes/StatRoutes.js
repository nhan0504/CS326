import express from "express";
import WardrobeController from "../controller/WardrobeController.js";

class StatRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        // Top 5 most worn items
        this.router.get("/:user_id/most-worn", async (req, res) => {
            const user_id = req.params.user_id;
            try {
              const items = await WardrobeController.getMostWornItems(user_id, req, res);
              res.json(items);
            } catch (error) {
              console.error("Error fetching most worn items:", error);
              res.status(500).json({ error: "Failed to fetch most worn items." });
            }
        });
        
        // List of items worn less than 2 times
        this.router.get("/:user_id/least-worn", async (req, res) => {
            const user_id = req.params.user_id;
            try {
              const items = await WardrobeController.getLeastWornItems(user_id, req, res);
              res.json(items);
            } catch (error) {
              console.error("Error fetching least worn items:", error);
              res.status(500).json({ error: "Failed to fetch least worn items." });
            }
        });

        // Cost per wear for each item
        this.router.get("/:user_id/cost-per-wear", async (req, res) => {
            const user_id = req.params.user_id;
            try {
              const costPerWear = await WardrobeController.getCostPerWear(user_id, req, res);
              res.json(costPerWear);
            } catch (error) {
              console.error("Error calculating cost per wear:", error);
              res.status(500).json({ error: "Failed to calculate cost per wear." });
            }
        });

        // Wear frequency of items in each category
        this.router.get("/:user_id/category-frequency", async (req, res) => {
            const user_id = req.params.user_id;
            try {
              const categories = await WardrobeController.getFrequencyPerCategory(user_id, req, res);
              res.json(categories);
            } catch (error) {
              console.error("Error fetching category frequency:", error);
              res.status(500).json({ error: "Failed to fetch category frequency." });
            }
        });

        // Number of items in each category
        this.router.get("/:user_id/items-per-category", async (req, res) => {
            const user_id = req.params.user_id;
            try {
              const categoryCounts = await WardrobeController.getItemPerCategory(user_id, req, res);
              res.json(categoryCounts);
            } catch (error) {
              console.error("Error fetching items per category:", error);
              res.status(500).json({ error: "Failed to fetch items per category." });
            }
        });
    }

    getRouter() {
        return this.router;
    }
}

export default new StatRoutes().getRouter();