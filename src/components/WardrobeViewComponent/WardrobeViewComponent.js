import { WardrobeItem } from "../../models/WardrobeItem.js";
import { BaseComponent } from "../BaseComponent/BaseComponent.js";

export class WardrobeViewComponent extends BaseComponent {
  #container = null;

  constructor(WardrobeViewData = {}) {
    super();
    this.WardrobeViewData = WardrobeViewData;
    this.loadCSS("WardrobeViewComponent");
  }

  render() {
    // Create the main container
    this.#container = document.createElement("div");
    this.#container.classList.add("view");
    this.#container.id = "wardrobeView";

    const title = document.createElement("h1");
    title.textContent = "Wardrobe";

    // Temp test data only to be used before connecting with search and filter
    const tempWardrobeItems = [
      new WardrobeItem(
        1,
        2,
        "https://via.placeholder.com/150",
        "My Shirt",
        43.21,
        "Small",
        "Shirt",
        "Casual",
        "Summer",
        "ABC"
      ),
      new WardrobeItem(
        2,
        2,
        "https://via.placeholder.com/100",
        "My Pants",
        20.42,
        "Medium",
        "Pants",
        "Casual",
        "Winter",
        "DEF"
      ),
      new WardrobeItem(
        1,
        2,
        "https://via.placeholder.com/150",
        "My Shirt",
        43.21,
        "Small",
        "Shirt",
        "Casual",
        "Summer",
        "ABC"
      ),
      new WardrobeItem(
        1,
        2,
        "https://via.placeholder.com/150",
        "My Shirt",
        43.21,
        "Small",
        "Shirt",
        "Casual",
        "Summer",
        "ABC"
      ),
    ];

    // Create the wardrobe grid container
    const wardrobeGrid = document.createElement("div");
    wardrobeGrid.classList.add("wardrobe-grid");

    // Create each wardrobe item and add it to the grid
    tempWardrobeItems.forEach((item) => {
      // Crate the item container
      const wardrobeItem = document.createElement("div");
      wardrobeItem.classList.add("wardrobe-item");

      // Add favorite button
      const favoriteButton = document.createElement("button");
      favoriteButton.classList.add("wardrobe-favorite-btn");
      const favoriteButtonImg = document.createElement("img");
      favoriteButtonImg.src = "../../img/heart-icon.png";
      favoriteButtonImg.alt = "Favorite Heart";
      favoriteButton.appendChild(favoriteButtonImg);
      wardrobeItem.appendChild(favoriteButton);
      favoriteButton.onclick = function () {
        if (favoriteButtonImg.src.endsWith("red-heart-icon.png")) {
          favoriteButtonImg.src = "../../img/heart-icon.png";
          item.unfavorite();
        } else {
          favoriteButtonImg.src = "../../img/red-heart-icon.png";
          item.favorite();
        }
      };

      // Add 'X' delete button
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "X";
      deleteButton.classList.add("wardrobe-delete-btn");
      wardrobeItem.appendChild(deleteButton);

      // Add item image
      const image = document.createElement("img");
      image.classList.add("wardrobe-item-image");
      image.src = item.image;
      image.alt = item.name;
      wardrobeItem.appendChild(image);

      // Add item name
      const name = document.createElement("h2");
      name.textContent = item.name;
      wardrobeItem.appendChild(name);

      // Add attributes
      const formattedDate = item.created_at.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const attributes = [
        { text_content: "Cost: ", value: item.cost },
        { text_content: "Size: ", value: item.size },
        { text_content: "Category: ", value: item.category },
        { text_content: "Occasion: ", value: item.occasion },
        { text_content: "Season: ", value: item.seasons },
        { text_content: "Brand: ", value: item.brand },
        { text_content: "Created On: ", value: formattedDate },
      ];
      attributes.forEach((attribute) => {
        const { text_content, value } = attribute;
        const text = document.createElement("p");
        const bold_text = document.createElement("strong");
        bold_text.textContent = text_content;
        text.appendChild(bold_text);
        const attribute_content = document.createTextNode(value);
        text.appendChild(attribute_content);
        wardrobeItem.appendChild(text);
      });

      // Add wardrobe item to the grid
      wardrobeGrid.appendChild(wardrobeItem);
    });

    this.#container.appendChild(title);
    this.#container.appendChild(wardrobeGrid);

    return this.#container;
  }
}
