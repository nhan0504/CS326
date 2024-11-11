import { WardrobeItem } from "../models/WardrobeItem.js";
import { OutfitEntry } from "../models/OutfitEntry.js";
import { WardrobeRepositoryService } from "../../services/WardrobeRepositoryService.js";

export function getTestWardrobeItems() {
  const wardrobeItems = [];

  wardrobeItems.push(
    new WardrobeItem(
      {
        item_id: "item1",
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
        item_id: "item2",
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
        item_id: "item3",
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
        item_id: "item4",
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
        item_id: "item5",
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
      ["item1", "item2"],
      "First outfit!",
      "01/11/2024",
      "01/11/2024",
      "casual",
      ["Winter"]
    )
  );

  outfits.push(
    new OutfitEntry(
      "2",
      "user1",
      ["item4", "item5"],
      "Second outfit!",
      "01/11/2024",
      "01/11/2024",
      "formal",
      ["Summer"]
    )
  );

  outfits.push(
    new OutfitEntry(
      "3",
      "user1",
      ["item1", "item3"],
      "Third outfit!",
      "01/11/2024",
      "01/11/2024",
      "lounge",
      ["Fall"]
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
