import { WardrobeItem } from "../models/WardrobeItem.js";
import { OutfitEntry } from "../models/OutfitEntry.js";
import { WardrobeRepositoryService } from "../../services/WardrobeRepositoryService.js";
import { OutfitRepositoryService } from "../../services/OutfitRepositoryService.js";

export function getTestWardrobeItems() {
  const wardrobeItems = [];

  wardrobeItems.push(
    new WardrobeItem(
      {
        item_id: "Blue T-shirt",
        user_id: "user1",
        image: "../testing/test-images/blue_shirt.jpg",
        name: "Blue T-shirt",
        cost: 20.0,
        size: "M",
        category: "top",
        occasion: "casual",
        seasons: ["Spring", "Summer"],
        brand: "BrandA",
      },
      false,
      2
    )
  );

  wardrobeItems.push(
    new WardrobeItem(
      {
        item_id: "Red Pants",
        user_id: "user1",
        image: "../testing/test-images/red_pants.png",
        name: "Red Pants",
        cost: 40.0,
        size: "S",
        category: "bottoms",
        occasion: "party",
        seasons: ["Fall", "Summer"],
        brand: "BrandA",
      },
      false,
      3
    )
  );

  wardrobeItems.push(
    new WardrobeItem(
      {
        item_id: "Blue Pants",
        user_id: "user1",
        image: "../testing/test-images/blue_pants.jpg",
        name: "Blue Pants",
        cost: 30.0,
        size: "S",
        category: "bottoms",
        occasion: "casual",
        seasons: ["Summer", "Spring", "Fall", "Winter"],
        brand: "BrandB",
      },
      false,
      5
    )
  );

  wardrobeItems.push(
    new WardrobeItem(
      {
        item_id: "Striped Dress",
        user_id: "user1",
        image: "../testing/test-images/striped_dress.jpg",
        name: "Striped Dress",
        cost: 40.0,
        size: "S",
        category: "dress",
        occasion: "casual",
        seasons: ["Summer", "Spring"],
        brand: "BrandC",
      },
      true,
      2
    )
  );

  wardrobeItems.push(
    new WardrobeItem(
      {
        item_id: "Loafers",
        user_id: "user1",
        image: "../testing/test-images/loafers.jpg",
        name: "Loafers",
        cost: 30.0,
        size: "S",
        category: "shoes",
        occasion: "formal",
        seasons: ["Summer", "Fall", "Winter", "Spring"],
        brand: "BrandC",
      },
      true,
      0
    )
  );

  return wardrobeItems;
}

export function getTestOutfits() {
  const outfits = [];

  outfits.push(
    new OutfitEntry(
      "1",
      "user1",
      ["Blue T-shirt", "Red Pants"],
      "First outfit!",
      "casual",
      ["Winter"],
      new Date("2023-12-25"),
      new Date("2023-12-25")
    )
  );

  outfits.push(
    new OutfitEntry(
      "2",
      "user1",
      ["Striped Dress", "Loafers"],
      "Second outfit!",
      "formal",
      ["Summer"],
      new Date("2015-06-25"),
      new Date("2015-06-25")
    )
  );

  outfits.push(
    new OutfitEntry(
      "3",
      "user1",
      ["Blue T-shirt", "Blue Pants"],
      "Third outfit!",
      "lounge",
      ["Fall"],
      new Date("2019-09-25"),
      new Date("2019-09-25")
    )
  );

  return outfits;
}

export async function loadTestWardrobeItems() {
  const wardrobeService = new WardrobeRepositoryService();
  const items = getTestWardrobeItems();

  try {
    await wardrobeService.initDB();
    await wardrobeService.clearWardrobeItems();
    items.forEach((item) => {
      wardrobeService.storeWardrobeItem(item.toJSON());
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function loadOutfitItems() {
  const outfitService = new OutfitRepositoryService();
  const items = getTestOutfits();

  try {
    await outfitService.initDB();
    await outfitService.clearOutfit();

    items.forEach((item) => {
      outfitService.storeOutfit(item.toJSON());
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
