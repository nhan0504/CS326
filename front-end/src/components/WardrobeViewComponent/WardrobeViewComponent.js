import { WardrobeItem } from "../../models/WardrobeItem.js";
import { WardrobeRepositoryService } from "../../services/WardrobeRepositoryService.js";
import { getTestWardrobeItems } from "../../testing/TestData.js";
import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { WardrobeAddItemForm } from "../WardrobeAddItemForm/WardrobeAddItemForm.js";

export class WardrobeViewComponent extends BaseComponent {
  #container = null;
  #addForm = null;
  #wardrobeItems = [];
  #wardrobeService = null;

  constructor(WardrobeViewData = {}) {
    super();
    this.WardrobeViewData = WardrobeViewData;
    this.loadCSS("WardrobeViewComponent");
    this.#wardrobeService = new WardrobeRepositoryService();
    this.loadWardrobeItems();

    this.subscribeToWardrobeEvents();
  }

  async loadWardrobeItems() {
    try {
      await this.#wardrobeService.initDB();
      this.#wardrobeItems =
        await this.#wardrobeService.loadWardrobeItemsFromDB();
      renderWardrobeItems(this.#wardrobeItems, this.#wardrobeService, this.#wardrobeItems);
    } catch (e) {
      console.error("Error:", e);
    }
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
        const element = this.#addForm.render(this.#wardrobeItems);
        document.body.appendChild(element);
      }
      this.#addForm.show();
    };

    // Create the filter bar
    const filterBar = this.createFilterBar(this.#wardrobeItems);

    // Create the wardrobe grid container
    const wardrobeGrid = document.createElement("div");
    wardrobeGrid.classList.add("wardrobe-grid");
    wardrobeGrid.id = "wardrobe-grid-container";

    this.#container.appendChild(title);

    // Create a container to hold the filter bar and grid container
    const wardrobeContainer = document.createElement("div");
    wardrobeContainer.classList.add("wardrobe-container");
    wardrobeContainer.id = "wardrobe-container";

    wardrobeContainer.appendChild(filterBar);
    wardrobeContainer.appendChild(wardrobeGrid);

    this.#container.appendChild(wardrobeContainer);

    return this.#container;
  }

  createFilterBar(wardrobeItems) {
    // Create container for filter bar elements
    const filterBar = document.createElement("div");
    filterBar.classList.add("wardrobe-filter-bar");

    // Title of filter bar
    const filterTitle = document.createElement("h2");
    filterTitle.textContent = "Filters";
    filterBar.appendChild(filterTitle);

    // Search bar label
    const searchDiv = document.createElement("div");
    searchDiv.classList.add("search-div");
    const searchLabel = document.createElement("label");
    searchLabel.htmlFor = "wardrobe-search";
    searchLabel.textContent = "Search:";

    // Search bar input
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.id = "wardrobe-search";
    searchDiv.appendChild(searchLabel);
    searchDiv.appendChild(searchInput);
    filterBar.appendChild(searchDiv);

    // Seasons checkboxes
    const seasonsDiv = document.createElement("div");
    const seasonsLabel = document.createElement("p");
    seasonsLabel.textContent = "Seasons:";
    seasonsDiv.appendChild(seasonsLabel);

    const seasons = ["spring", "summer", "fall", "winter"];
    seasons.forEach((season) => {
      const seasonCheckbox = document.createElement("input");
      seasonCheckbox.type = "checkbox";
      seasonCheckbox.id = "wardrobe-filter-" + season;
      seasonCheckbox.name = "wardrobe-filter-seasons";
      seasonCheckbox.value = season;
      seasonCheckbox.checked = true;

      // Season Checkbox Label
      const seasonLabel = document.createElement("label");
      seasonLabel.htmlFor = season;
      seasonLabel.textContent = season.charAt(0).toUpperCase() + season.slice(1);

      seasonsDiv.appendChild(seasonCheckbox);
      seasonsDiv.appendChild(seasonLabel);
      seasonsDiv.appendChild(document.createElement("br"));
    });

    filterBar.appendChild(seasonsDiv);
    filterBar.appendChild(document.createElement("br"));

    // Occasion dropdown
    const occasionDiv = document.createElement("div");
    const occasionLabel = document.createElement("label");
    occasionLabel.htmlFor = "occasion";
    occasionLabel.textContent = "Occasion:";

    const occasionSelect = document.createElement("select");
    occasionSelect.id = "wardrobe-occasion";
    occasionSelect.name = "wardrobe-occasion";

    const occasions = [
      "any",
      "formal",
      "casual",
      "business",
      "party",
      "lounge",
      "other",
    ];
    occasions.forEach((optionValue) => {
      const option = document.createElement("option");
      option.value = optionValue;
      option.textContent = optionValue.charAt(0).toUpperCase() + optionValue.slice(1);
      occasionSelect.appendChild(option);
    });

    occasionDiv.appendChild(occasionLabel);
    occasionDiv.appendChild(occasionSelect);
    filterBar.appendChild(occasionDiv);

    // Apply filters button
    const applyFiltersButton = document.createElement("button");
    applyFiltersButton.textContent = "Apply Filters";
    applyFiltersButton.classList.add("wardrobe-apply-filters-button");
    applyFiltersButton.addEventListener("click", () => {
      this.applyFilters(this.#wardrobeItems);
    });

    // Wrap the button in a div
    const buttonWrapper = document.createElement("div");
    buttonWrapper.style.display = "flex";
    buttonWrapper.style.justifyContent = "center";
    buttonWrapper.appendChild(applyFiltersButton);

    filterBar.appendChild(buttonWrapper);
    return filterBar;
  }

  subscribeToWardrobeEvents() {
    document.addEventListener('StoreWardrobeItemSuccess', (event) => {
      const newItem = event.detail;
      this.#wardrobeItems.push(newItem);
      console.log('New wardrobe item added:', newItem);
  
      this.render()
    });
  
    document.addEventListener('StoreWardrobeItemFailure', (event) => {
      console.error('Failed to store wardrobe item:', event.detail);
    });

    document.addEventListener('UnStoreWardrobeItemSuccess', async () => {
      console.log('All wardrobe items cleared');
  
      this.#wardrobeItems = [];
  
      this.render();
    });
  
    document.addEventListener('UnStoreWardrobeItemFailure', (event) => {
      console.error('Failed to clear wardrobe items:', event.detail);
      alert('Failed to clear wardrobe items. Please try again.');
    });
  }
  
  applyFilters(wardrobeItems) {
    // Retrieve selected seasons from checkboxes
    const selectedSeasons = Array.from(
      document.querySelectorAll("input[name='wardrobe-filter-seasons']:checked")
    ).map((cb) => cb.value);
    const selectedOccasion = document.getElementById("wardrobe-occasion").value;

    const searchTerm = document
      .getElementById("wardrobe-search")
      .value.toLowerCase();

    let filteredItems = wardrobeItems;

    // Filter by season
    filteredItems = filteredItems.filter((item) =>
      item.seasons.some((season) =>
        selectedSeasons
          .map((s) => s.toLowerCase())
          .includes(season.toLowerCase())
      )
    );

    // Filter by occasion
    if (selectedOccasion !== "any") {
      filteredItems = filteredItems.filter(
        (item) => item.occasion === selectedOccasion || item.occasion === "any"
      );
    }

    // Filter by search term
    if (searchTerm) {
      filteredItems = filteredItems.filter(
        (item) =>
          item.item_id.toString().includes(searchTerm.toLowerCase()) ||
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Render filtered wardrobe items
    const wardrobeGrid = document.getElementById("wardrobe-grid-container");
    wardrobeGrid.innerHTML = "";
    renderWardrobeItems(
      filteredItems,
      this.#wardrobeService,
      this.#wardrobeItems
    );
    return filteredItems;
  }
}

// render the wardrobe items
export function renderWardrobeItems(
  wardrobeItems,
  wardrobeService,
  displayedWardrobeItems
) {
  // Get the wardrobe grid container
  const wardrobeGrid = document.getElementById("wardrobe-grid-container");

  // Create each wardrobe item and add it to the grid
  wardrobeItems.forEach((item) => {
    // Crate the item container
    const wardrobeItem = document.createElement("div");
    wardrobeItem.classList.add("wardrobe-item");

    // Add favorite button
    const heartIcon = document.createElement("span");

    if (item.is_favorite) {
      heartIcon.classList.add("favorite-icon");
    } else {
      heartIcon.classList.add("non-favorite-icon");
    }

    heartIcon.classList.add("wardrobe-favorite-btn");
    heartIcon.innerHTML = '<i class="fa-solid fa-heart"></i>';
    wardrobeItem.appendChild(heartIcon);
    // Make the favorite button red and update the item when clicked
    heartIcon.onclick = function () {
      wardrobeService.toggleFavorite(item.item_id);
      item.is_favorite = !item.is_favorite;

      if (heartIcon.classList.contains("favorite-icon")) {
        heartIcon.classList.add("non-favorite-icon");
        heartIcon.classList.remove("favorite-icon");
      } else {
        heartIcon.classList.add("favorite-icon");
        heartIcon.classList.remove("non-favorite-icon");
      }
    };

    // Add trash can delete button
    const trashIcon = document.createElement("span");
    trashIcon.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashIcon.classList.add("wardrobe-delete-btn");
    wardrobeItem.appendChild(trashIcon);
    // Delete the item when clicked
    trashIcon.onclick = function () {
      wardrobeService.clearWardrobeItem(item.item_id);
      wardrobeItem.remove();
      const index = displayedWardrobeItems.findIndex(
        (i) => i.item_id === item.item_id
      );
      displayedWardrobeItems.splice(index, 1);
    };

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
    const date = new Date(item.created_at);
    const formattedDate = date.toLocaleDateString("en-US", {
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
}
