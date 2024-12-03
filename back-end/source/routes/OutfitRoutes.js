import express from "express";
import OutfitController from "../controller/OutfitController.js";

class OutfitRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/outfits", async (req, res) => {
      await OutfitController.getAllOutfits(req, res);
    });

    this.router.post("/outfit", async (req, res) => {
      await OutfitController.addOutfit(req, res);
    });

    this.router.delete("/outfits", async (req, res) => {
      await OutfitController.clearOutfits(req, res);
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new OutfitRoutes().getRouter();