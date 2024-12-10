import express from "express";
import OutfitController from "../controller/OutfitController.js";

class OutfitRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/:id", async (req, res) => {
    const user_id = req.params.id;
    await OutfitController.getAllOutfits(user_id, req, res);
    });

    this.router.post("/", async (req, res) => {
      await OutfitController.addOutfit(req, res);
    });

    this.router.delete("/", async (req, res) => {
      await OutfitController.clearOutfits(req, res);
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new OutfitRoutes().getRouter();
