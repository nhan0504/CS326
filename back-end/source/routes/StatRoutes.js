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
        this.router.get("/category-frequency", async (req, res) => {
            try {
              const categories = await WardrobeController.getFrequencyPerCategory(req, res);
              res.json(categories);
            } catch (error) {
              console.error("Error fetching category frequency:", error);
              res.status(500).json({ error: "Failed to fetch category frequency." });
            }
        });

        // Number of items in each category
        this.router.get("/items-per-category", async (req, res) => {
            try {;
              const categoryCounts = await WardrobeController.getItemPerCategory(req, res);
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