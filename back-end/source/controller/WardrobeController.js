import ModelFactory from "../model/ModelFactory.js";
import { Sequelize } from "sequelize";

class WardrobeController {
  constructor() {
    this.model = null;
  }
  // constructor() {
  //   ModelFactory.getModel().then((model) => {
  //     this.model = model;
  //   });
  // }

  async init() {
    this.model = await ModelFactory.getModel("sqlite-fresh", "wardrobe");
  }

  // Get all wardrobe items
  async getAllItems(req, res) {
    const items = await this.model.read();
    res.json({ items });
  }

  //Get top 5 most worn item
  async getMostWornItems(user_id, req, res) {
    try {
      const items = await this.model.read({
        user_id: user_id,
      });
  
      const topItems = items
        .sort((a, b) => b.times_worn - a.times_worn)
        .slice(0, 5);
  
      res.json({items: topItems});
    } catch (error) {
      console.error("Error fetching most worn items:", error);
      res.status(500).json({ error: "Failed to fetch most worn items." });
    }
  }

  //Get items worn less than 2 times
  async getLeastWornItems(user_id, req, res) {
    try {
      const items = await this.model.read({
        user_id: user_id,
        times_worn: { [Sequelize.Op.lt]: 2 }
      });
      res.json({items});
    } catch (error) {
      console.error("Error fetching least worn items:", error);
      res.status(500).json({ error: "Failed to fetch least worn items." });
    }
  }

  async getCostPerWear(user_id, req, res) {
    try { 
      const items = await this.model.read({
        user_id: user_id,
      });
      const costPerWear = items.map((item) => ({
        item_id: item.item_id,
        name: item.name,
        cost_per_wear: item.times_worn > 0 ? (item.cost / item.times_worn).toFixed(2) : null,
      }));
      res.json({items: costPerWear});
    } catch (error) {
      console.error("Error fetching cost per item:", error);
      res.status(500).json({ error: "Failed to fetch cost per items." });
    }
  }

  async getFrequencyPerCategory(user_id, req, res) {
    try {
      const items = await this.model.getFrequencyPerCategory(user_id);
      res.json({items});
    } catch (error) {
      console.error("Error fetching item frequency per category:", error);
      res.status(500).json({ error: "Failed to fetch item frequency per category." });
    }
  }

  async getItemPerCategory(user_id, req, res) {
    try {
      const items = await this.model.getItemPerCategory(user_id);
      res.json({items});
    } catch (error) {
      console.error("Error fetching number of item per category:", error);
      res.status(500).json({ error: "Failed to fetch number of item per category." });
    }
  }

  // Add a new wardrobe item
  async addWardrobeItem(req, res) {
    try {
      // Check if 'item' is provided in the request body
      if (!req.body) {
        return res.status(400).json({ error: "Item detail is required." });
      }

      // Create the new item object with a unique ID
      const item = await this.model.create(req.body);

      // Log the full item for debugging
      const file = req.body.file
        ? `with file: ${req.body.filename}`
        : "without file";
      console.log(`New Item: ${item.id} - ${file}`);

      // Send back the created item as the response
      return res.status(201).json(item);
    } catch (error) {
      // Log any unexpected errors and send a server error response
      console.error("Error adding item:", error);
      return res
        .status(500)
        .json({ error: "Failed to add item. Please try again." });
    }
  }

  // Clear all items
  async clearItems(req, res) {
    await this.model.delete();
    res.json(await this.model.read());
  }
}

//export default new WardrobeController();

const wardrobeController = new WardrobeController();
await wardrobeController.init(); // Initialize the model

export default wardrobeController;