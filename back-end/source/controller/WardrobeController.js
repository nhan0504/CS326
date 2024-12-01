import ModelFactory from "../model/ModelFactory.js";

class WardrobeController {
  constructor() {
    ModelFactory.getModel().then((model) => {
      this.model = model;
    });
  }

  // Get all wardrobe items
  async getAllWardrobeItems(req, res) {
    const items = await this.model.read();
    res.json({ items });
  }

  // Add a new wardrobe item
  async addWardrobeItem(req, res) {
    try {
      // Check if 'item' is provided in the request body
      if (!req.body || !req.body.item) {
        return res.status(400).json({ error: "Item description is required." });
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

export default new WardrobeController();
