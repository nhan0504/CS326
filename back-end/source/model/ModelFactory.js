import SQLiteOutfitModel from "./SQLiteOutfitModel.js";
import SQLiteWardrobeModel from "./SQLiteWardrobeModel.js";

class _ModelFactory {
  async getModel(model = "sqlite", type = "outfit") {
    if (model === "sqlite") {
      if (type === "outfit") {
        return SQLiteOutfitModel;
      } else if (type === "wardrobe") {
        return SQLiteWardrobeModel;
      } else {
        throw new Error(`Unknown model type: ${type}`);
      }
    } else if (model === "sqlite-fresh") {
      if (type === "outfit") {
        await SQLiteOutfitModel.init(true);
        return SQLiteOutfitModel;
      } else if (type === "wardrobe") {
        await SQLiteWardrobeModel.init(true);
        return SQLiteWardrobeModel;
      } else {
        throw new Error(`Unknown model type: ${type}`);
      }
    } else {
      throw new Error(`Unknown model: ${model}`);
    }
  }
}

const ModelFactory = new _ModelFactory();
export default ModelFactory;
