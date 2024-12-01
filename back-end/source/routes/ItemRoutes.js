import express from "express";
import WardrobeController from "../controller/WardrobeController.js";

class ItemRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/items", async (req, res) => {
      await WardrobeController.getAllItems(req, res);
    });

    this.router.post("/item", async (req, res) => {
      await WardrobeController.addWardrobeItem(req, res);
    });

    this.router.delete("/items", async (req, res) => {
      await WardrobeController.clearItems(req, res);
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new ItemRoutes().getRouter();
