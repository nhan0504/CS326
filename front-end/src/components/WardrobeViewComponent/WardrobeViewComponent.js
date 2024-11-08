import { WardrobeItem } from "../../models/WardrobeItem.js";
import { getTestWardrobeItems } from "../../testing/TestData.js";
import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { WardrobeAddItemForm } from "../WardrobeAddItemForm/WardrobeAddItemForm.js";

export class WardrobeViewComponent extends BaseComponent {
  #container = null;
  #addForm = null;

  constructor(WardrobeViewData = {}) {
    super();
    this.WardrobeViewData = WardrobeViewData;
    this.loadCSS("WardrobeViewComponent");
  }

  render() {
    // Create the main container
    this.#container = document.createElement("div");
    this.#container.classList.add("view");
    this.#container.classList.add("wardrobe-view");
    this.#container.id = "wardrobeView";

    // Create title
    const title = document.createElement("h1");
    title.textContent = "Wardrobe";

    // Create the add item button
    const addItemButton = document.createElement("span");
    addItemButton.innerHTML = '<i class="fa-solid fa-circle-plus"></i>';
    addItemButton.classList.add("wardrobe-add-item-btn");
    this.#container.appendChild(addItemButton);
    // Render the add item form when the button is clicked
    addItemButton.onclick = () => {
      if (!this.#addForm) {
        this.#addForm = new WardrobeAddItemForm();
        const element = this.#addForm.render();
        document.body.appendChild(element);
      }
      this.#addForm.show();
    };

    // Temp test data only to be used before connecting with search and filter
    const tempWardrobeItems = getTestWardrobeItems();

    // Create the wardrobe grid container
    const wardrobeGrid = document.createElement("div");
    wardrobeGrid.classList.add("wardrobe-grid");

    // Create each wardrobe item and add it to the grid
    tempWardrobeItems.forEach((item) => {
      // Crate the item container
      const wardrobeItem = document.createElement("div");
      wardrobeItem.classList.add("wardrobe-item");

      // Add favorite button
      const heartIcon = document.createElement("span");
      heartIcon.classList.add("favorite-icon");
      heartIcon.classList.add("wardrobe-favorite-btn");
      heartIcon.innerHTML = '<i class="fa-solid fa-heart"></i>';
      wardrobeItem.appendChild(heartIcon);
      // Make the favorite button red and update the item when clicked
      heartIcon.onclick = function () {
        if (heartIcon.classList.contains("favorite-icon")) {
          heartIcon.classList.remove("favorite-icon");
          heartIcon.classList.add("favorite-icon-red");
          item.favorite();
        } else {
          heartIcon.classList.remove("favorite-icon-red");
          heartIcon.classList.add("favorite-icon");
          item.unfavorite();
        }
      };

      // Add trash can delete button
      const trashIcon = document.createElement("span");
      trashIcon.innerHTML = '<i class="fa-solid fa-trash"></i>';
      trashIcon.classList.add("wardrobe-delete-btn");
      wardrobeItem.appendChild(trashIcon);

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
