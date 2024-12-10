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
          await WardrobeController.getMostWornItems(user_id, req, res);  
        });
        
        // List of items worn less than 2 times
        this.router.get("/:user_id/least-worn", async (req, res) => {
          const user_id = req.params.user_id;
          await WardrobeController.getLeastWornItems(user_id, req, res);
        });

        // Cost per wear for each item
        this.router.get("/:user_id/cost-per-wear", async (req, res) => {
          const user_id = req.params.user_id;
          await WardrobeController.getCostPerWear(user_id, req, res);
        });

        // Wear frequency of items in each category
        this.router.get("/:user_id/category-frequency", async (req, res) => {
          const user_id = req.params.user_id;
          await WardrobeController.getFrequencyPerCategory(user_id, req, res);
        });

        // Number of items in each category
        this.router.get("/:user_id/items-per-category", async (req, res) => {
          const user_id = req.params.user_id;
          await WardrobeController.getItemPerCategory(user_id, req, res);
        });
    }

    getRouter() {
      return this.router;
    }
}

export default new StatRoutes().getRouter();