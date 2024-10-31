import { WardrobeItem } from "../models/WardrobeItem.js";

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
