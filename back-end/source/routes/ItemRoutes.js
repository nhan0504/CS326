import express from "express";
import WardrobeController from "../controller/WardrobeController.js";

class ItemRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/:id", async (req, res) => {
      const user_id = req.params.id;
      await WardrobeController.getAllItems(user_id, req, res);
    });

    this.router.post("/", async (req, res) => {
      await WardrobeController.addWardrobeItem(req, res);
    });

    this.router.delete("/", async (req, res) => {
      await WardrobeController.clearItems(req, res);
    });

    // this.router.delete("/", async (req, res) => {
    //   await WardrobeController.deleteWardrobeItem(req, res);
    // });

    this.router.post("/delete", async (req, res) => {
      await WardrobeController.deleteWardrobeItem(req, res);
    });
    
    
  }

  getRouter() {
    return this.router;
  }
}

export default new ItemRoutes().getRouter();
