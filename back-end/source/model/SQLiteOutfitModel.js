import { Sequelize, DataTypes } from "sequelize";

// Initialize a new Sequelize instance with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

// Define the OutfitEntry model
const OutfitEntry = sequelize.define("OutfitEntry", {
  outfit_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  wardrobe_item_ids: {
    type: DataTypes.JSON, // Store array of item IDs as JSON
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  occasion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  seasons: {
    type: DataTypes.JSON, // Store array of seasons as JSON
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

class _SQLiteOutfitModel {
  constructor() {}

  async init(fresh = false) {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    if (fresh) {
      await this.delete();
    }
  }

  async create(entry) {
    return await OutfitEntry.create(entry);
  }

  async read(id = null) {
    if (id) {
      return await OutfitEntry.findByPk(id);
    }
    return await OutfitEntry.findAll();
  }

  async update(entry) {
    const existingEntry = await OutfitEntry.findByPk(entry.outfit_id);
    if (!existingEntry) {
      return null;
    }

    await existingEntry.update({
      ...entry,
      updated_at: new Date(),
    });
    return existingEntry;
  }

  async delete(entry = null) {
    if (entry === null) {
      await OutfitEntry.destroy({ truncate: true });
      return;
    }

    await OutfitEntry.destroy({ where: { outfit_id: entry.outfit_id } });
    return entry;
  }
}

const SQLiteOutfitModel = new _SQLiteOutfitModel();

export default SQLiteOutfitModel;
