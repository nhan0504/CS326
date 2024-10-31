import { WardrobeItem } from "../models/WardrobeItem.js";
import { OutfitEntry } from "../models/OutfitEntry.js";
import { WardrobeRepositoryService } from "../../services/WardrobeRepositoryService.js";

export function getTestWardrobeItems() {
  const wardrobeItems = [];

  wardrobeItems.push(
    new WardrobeItem(
      "item1",
      "user1",
      "../testing/test-images/blue_shirt.jpg",
      "Blue T-shirt",
      20.0,
      "M",
      "tops",
      "casual",
      ["Spring", "Summer"],
      "BrandA",
      false,
      2
    )
  );

  wardrobeItems.push(
    new WardrobeItem(
      "item2",
      "user1",
      "../testing/test-images/red_pants.png",
      "Red Pants",
      40.0,
      "S",
      "bottoms",
      "party",
      ["Fall", "Summer"],
      "BrandA",
      false,
      3
    )
  );

  wardrobeItems.push(
    new WardrobeItem(
      "item3",
      "user1",
      "../testing/test-images/blue_pants.jpg",
      "Blue Pants",
      30.0,
      "S",
      "bottoms",
      "casual",
      ["Summer", "Spring", "Fall", "Winter"],
      "BrandB",
      false,
      5
    )
  );

  wardrobeItems.push(
    new WardrobeItem(
      "item4",
      "user1",
      "../testing/test-images/striped_dress.jpg",
      "Striped Dress",
      40.0,
      "S",
      "dresses",
      "casual",
      ["Summer", "Spring"],
      "BrandC",
      true,
      2
    )
  );

  wardrobeItems.push(
    new WardrobeItem(
      "item5",
      "user1",
      "../testing/test-images/loafers.jpg",
      "Loafers",
      30.0,
      "S",
      "shoes",
      "formal",
      ["Summer", "Fall", "Winter", "Spring"],
      "BrandC",
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
  )

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
  )

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
  )

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
  )

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

    items.forEach(item => {
      wardrobeService.storeWardrobeItem(item.toJSON());
    });
  } catch (error) {
    console.error('Error:', error);
  }
}