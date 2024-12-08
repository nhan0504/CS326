import express from "express";
import WardrobeController from "../controller/WardrobeController.js";

class SuggestionsRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // fetch the suggested outfits on a GET request to http://localhost:4000/v1/suggestions
    this.router.get("/", async (req, res) => {
      const outfits = await WardrobeController.getSuggestedOutfits(req, res);
      res.json(outfits);
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new SuggestionsRoutes().getRouter();
