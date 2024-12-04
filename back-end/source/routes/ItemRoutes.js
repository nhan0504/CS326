import express from "express";
import WardrobeController from "../controller/WardrobeController.js";

class ItemRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", async (req, res) => {
      await WardrobeController.getAllItems(req, res);
    });

    this.router.post("/", async (req, res) => {
      await WardrobeController.addWardrobeItem(req, res);
    });

    this.router.delete("/", async (req, res) => {
      await WardrobeController.clearItems(req, res);
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new ItemRoutes().getRouter();
