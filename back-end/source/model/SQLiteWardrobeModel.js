import { Sequelize, DataTypes } from "sequelize";

// Initialize a new Sequelize instance with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

// Define the WardrobeItem model
const WardrobeItem = sequelize.define("WardrobeItem", {
  item_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING, // URL or file path
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
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
  brand: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  times_worn: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
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

class _SQLiteWardrobeModel {
  constructor() {}

  async init(fresh = false) {
    await sequelize.authenticate();
    await sequelize.sync({ force: fresh });

    if (fresh) {
      await this.delete();

      // Example seed data
      await this.create({
        user_id: "user-123",
        image: "image1.jpg",
        name: "T-shirt",
        cost: 20.0,
        size: "M",
        category: "Topwear",
        occasion: "Casual",
        seasons: ["Summer"],
        brand: "Brand A",
        is_favorite: true,
        times_worn: 5,
      });

      await this.create({
        user_id: "user-456",
        image: "image2.jpg",
        name: "Jeans",
        cost: 40.0,
        size: "L",
        category: "Bottomwear",
        occasion: "Everyday",
        seasons: ["All"],
        brand: "Brand B",
        is_favorite: false,
        times_worn: 2,
      });
    }
  }

  async create(item) {
    return await WardrobeItem.create(item);
  }

  async read(id = null) {
    if (id) {
      return await WardrobeItem.findByPk(id);
    }
    return await WardrobeItem.findAll();
  }

  async update(item) {
    const existingItem = await WardrobeItem.findByPk(item.item_id);
    if (!existingItem) {
      return null;
    }

    await existingItem.update({
      ...item,
      updated_at: new Date(),
    });
    return existingItem;
  }

  async markAsWorn(id) {
    const item = await WardrobeItem.findByPk(id);
    if (!item) {
      return null;
    }

    await item.update({
      times_worn: item.times_worn + 1,
      updated_at: new Date(),
    });
    return item;
  }

  async delete(item = null) {
    if (item === null) {
      await WardrobeItem.destroy({ truncate: true });
      return;
    }

    await WardrobeItem.destroy({ where: { item_id: item.item_id } });
    return item;
  }
}

const SQLiteWardrobeModel = new _SQLiteWardrobeModel();

export default SQLiteWardrobeModel;
