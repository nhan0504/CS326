import ModelFactory from "../model/ModelFactory.js";

class OutfitController {
  // constructor() {
  //   ModelFactory.getModel().then((model) => {
  //     this.model = model;
  //   });
  // }
  async init() {
    this.model = await ModelFactory.getModel("sqlite-fresh", "outfit");
  }
  // Get all outfits
  async getAllOutfits(req, res) {
    const outfits = await this.model.read();
    res.json({ outfits });
  }

  // Add a new outfit
  async addOutfit(req, res) {
    try {
      // Check if 'outfit' is provided in the request body
      if (!req.body) {
        return res.status(400).json({ error: "Outfit description is required." });
      }

      // Create the new outfit object with a unique ID
      const outfit = await this.model.create(req.body);

      // Log the full outfit for debugging
      const file = req.body.file
        ? `with file: ${req.body.filename}`
        : "without file";
      console.log(`New Outfit: ${outfit.id} - ${file}`);

      // Send back the created outfit as the response
      return res.status(201).json(outfit);
    } catch (error) {
      // Log any unexpected errors and send a server error response
      console.error("Error adding outfit:", error);
      return res
        .status(500)
        .json({ error: "Failed to add outfit. Please try again." });
    }
  }

  // Clear all outfits
  async clearOutfits(req, res) {
    await this.model.delete();
    res.json(await this.model.read());
  }
}

const outfitController = new OutfitController();
await outfitController.init(); // Initialize the model

export default outfitController;