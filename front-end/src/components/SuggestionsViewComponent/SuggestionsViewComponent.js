import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { loadTestWardrobeItems } from "../../testing/TestData.js";
import { WardrobeRepositoryService } from "../../services/WardrobeRepositoryService.js";
import { CATEGORIES, OCCASIONS, SEASONS } from "../constants.js";

export class SuggestionsViewComponent extends BaseComponent {
  #container = null;
  #wardrobeItems = [];

  constructor(SuggestionsViewData = {}) {
    super();
    this.SuggestionsViewData = SuggestionsViewData;
    this.loadCSS("SuggestionsViewComponent");

    // UNCOMMENT TO LOAD TEST WARDROBE ITEMS
    // loadTestWardrobeItems();

    this.wardrobeService = new WardrobeRepositoryService();
    this.loadWardrobe();
  }

  async loadWardrobe() {
    try {
      await this.wardrobeService.initDB();

      this.#wardrobeItems =
        await this.wardrobeService.loadWardrobeItemsFromDB();
      this.applyFilters();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  render() {
    // Create the main container
    this.#container = document.createElement("div");
    this.#container.classList.add("view");
    this.#container.id = "suggestionsView";
    this.#container.style.display = "none";

    // Create the suggestions container
    const suggestionsContainer = document.createElement("div");
    suggestionsContainer.classList.add("suggestions-container");

    // Create the filter bar
    const filterBar = this.createFilterBar();
    suggestionsContainer.appendChild(filterBar);

    // Create the outfit list
    const outfitListDiv = this.createOutfitList();
    suggestionsContainer.appendChild(outfitListDiv);

    // Append suggestions container to main container
    this.#container.appendChild(suggestionsContainer);

    return this.#container;
  }

  createFilterBar() {
    const filterBar = document.createElement("div");
    filterBar.classList.add("filter-bar");

    const filterTitle = document.createElement("h2");
    filterTitle.textContent = "Filters";
    filterBar.appendChild(filterTitle);

    // Favorites only checkbox
    const favoritesDiv = document.createElement("div");
    const favoritesCheckbox = document.createElement("input");
    favoritesCheckbox.type = "checkbox";
    favoritesCheckbox.id = "favorites-only";
    favoritesCheckbox.name = "favorites-only";

    const favoritesLabel = document.createElement("label");
    favoritesLabel.htmlFor = "favorites-only";
    favoritesLabel.textContent = "Favorites only";

    favoritesDiv.appendChild(favoritesCheckbox);
    favoritesDiv.appendChild(favoritesLabel);
    filterBar.appendChild(favoritesDiv);

    // Underutilized pieces checkbox
    const underutilizedDiv = document.createElement("div");
    const underutilizedCheckbox = document.createElement("input");
    underutilizedCheckbox.type = "checkbox";
    underutilizedCheckbox.id = "underutilized-pieces";
    underutilizedCheckbox.name = "underutilized-pieces";

    const underutilizedLabel = document.createElement("label");
    underutilizedLabel.htmlFor = "underutilized-pieces";
    underutilizedLabel.textContent = "Suggest underutilized pieces";

    underutilizedDiv.appendChild(underutilizedCheckbox);
    underutilizedDiv.appendChild(underutilizedLabel);
    filterBar.appendChild(underutilizedDiv);

    // Seasons checkboxes
    const seasonsDiv = document.createElement("div");
    const seasonsLabel = document.createElement("p");
    seasonsLabel.textContent = "Seasons:";
    seasonsDiv.appendChild(seasonsLabel);

    SEASONS.forEach((season) => {
      const seasonCheckbox = document.createElement("input");
      seasonCheckbox.type = "checkbox";
      seasonCheckbox.id = season;
      seasonCheckbox.name = "seasons";
      seasonCheckbox.value = season;
      seasonCheckbox.checked = true;

      const seasonLabel = document.createElement("label");
      seasonLabel.htmlFor = season;
      seasonLabel.textContent =
        season.charAt(0).toUpperCase() + season.slice(1);

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
    occasionSelect.id = "occasion";
    occasionSelect.name = "occasion";

    OCCASIONS.forEach((optionValue) => {
      const option = document.createElement("option");
      option.value = optionValue;
      option.textContent =
        optionValue.charAt(0).toUpperCase() + optionValue.slice(1);
      occasionSelect.appendChild(option);
    });

    occasionDiv.appendChild(occasionLabel);
    occasionDiv.appendChild(occasionSelect);
    filterBar.appendChild(occasionDiv);

    // Apply filters button
    const applyFiltersButton = document.createElement("button");
    applyFiltersButton.textContent = "Apply Filters";
    applyFiltersButton.classList.add("apply-filters-button");
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

  createOutfitList() {
    const outfitListDiv = document.createElement("div");
    outfitListDiv.classList.add("outfit-list");

    const outfitListTitle = document.createElement("h2");
    outfitListTitle.textContent = "Outfit Suggestions";
    outfitListDiv.appendChild(outfitListTitle);

    const applyFiltersMessage = document.createElement("p");
    applyFiltersMessage.textContent =
      "Select your filters, and then click 'Apply Filters' to generate outfits!";
    applyFiltersMessage.classList.add("apply-filters-message");
    outfitListDiv.appendChild(applyFiltersMessage);

    const outfitList = document.createElement("ul");
    outfitListDiv.appendChild(outfitList);
    outfitList.classList.add("outfit-list-ul");

    return outfitListDiv;
  }

  applyFilters() {
    const applyFiltersMessage = document.querySelector(
      ".apply-filters-message"
    );
    if (applyFiltersMessage) {
      applyFiltersMessage.style.display = "none";
    }

    const favoritesOnly = document.getElementById("favorites-only").checked;
    const suggestUnderutilizedPieces = document.getElementById(
      "underutilized-pieces"
    ).checked;
    const selectedSeasons = Array.from(
      document.querySelectorAll("input[name='seasons']:checked")
    ).map((cb) => cb.value);
    const selectedOccasion = document.getElementById("occasion").value;

    let filteredItems = this.#wardrobeItems;

    if (favoritesOnly) {
      filteredItems = filteredItems.filter((item) => item.is_favorite);
    }

    if (suggestUnderutilizedPieces) {
      filteredItems = filteredItems.filter((item) => item.times_worn < 3);
    }

    filteredItems = filteredItems.filter((item) =>
      item.seasons.some((season) =>
        selectedSeasons
          .map((s) => s.toLowerCase())
          .includes(season.toLowerCase())
      )
    );

    if (selectedOccasion !== "any") {
      filteredItems = filteredItems.filter(
        (item) => item.occasion === selectedOccasion
      );
    }

    let suggestedOutfits = this.generateOutfitSuggestions(filteredItems);

    this.renderSuggestedOutfits(suggestedOutfits);
  }

  renderSuggestedOutfits(suggestedOutfits) {
    const outfitList = document.querySelector(".outfit-list ul");
    outfitList.innerHTML = "";

    if (suggestedOutfits.length === 0) {
      const noOutfitsMessage = document.createElement("p");
      noOutfitsMessage.textContent =
        "Oops—we're out of ideas! To see more suggestions, adjust your filters or add more items from your wardrobe.";
      outfitList.appendChild(noOutfitsMessage);
      return; // Exit the function early
    }

    suggestedOutfits.forEach((outfit, i) => {
      const outfitItem = document.createElement("li");
      outfitItem.classList.add("suggested-outfit-item");

      const outfitInfo = document.createElement("div");
      outfitInfo.classList.add("outfit-info");

      const outfitImagesContainer = document.createElement("div");
      outfitImagesContainer.classList.add("outfit-images-container");

      outfit.forEach((item) => {
        const itemImage = document.createElement("img");
        itemImage.src = item.image;
        itemImage.alt = item.name;
        itemImage.classList.add("item-image");
        outfitImagesContainer.appendChild(itemImage);
      });

      outfitInfo.appendChild(outfitImagesContainer);
      outfitItem.appendChild(outfitInfo);

      // Create the expand button
      const expandBtn = document.createElement("button");
      expandBtn.classList.add("expand-btn");
      expandBtn.dataset.outfit = i;

      // Add Font Awesome icons for expand and collapse
      const expandIcon = document.createElement("i");
      expandIcon.classList.add("fa-solid", "fa-expand");
      expandBtn.appendChild(expandIcon);

      expandBtn.addEventListener("click", function () {
        const details = document.getElementById(`outfit-details-${i}`);

        // Toggle display style and icon
        if (details.style.display === "none" || details.style.display === "") {
          details.style.display = "block"; // Expand the details
          expandIcon.classList.remove("fa-expand");
          expandIcon.classList.add("fa-compress");
        } else {
          details.style.display = "none"; // Collapse the details
          expandIcon.classList.remove("fa-compress");
          expandIcon.classList.add("fa-expand");
        }
      });

      outfitItem.appendChild(expandBtn);

      const outfitDetails = document.createElement("div");
      outfitDetails.id = `outfit-details-${i}`;
      outfitDetails.classList.add("outfit-details");
      outfitDetails.style.display = "none"; // Keep details hidden initially

      // List outfit elements with photos
      const outfitElements = document.createElement("div");
      outfit.forEach((item) => {
        const itemEntry = document.createElement("div");
        itemEntry.classList.add("item-entry"); // Add a class for styling

        const itemInfo = document.createElement("span");
        itemInfo.classList.add("item-info");

        const itemImage = document.createElement("img");
        itemImage.src = item.image;
        itemImage.alt = item.name;
        itemImage.classList.add("detail-item-image");

        const itemText = document.createElement("span");
        const timesWornText =
          item.times_worn === 1
            ? `(${item.times_worn} wear)`
            : `(${item.times_worn} wears)`;
        itemText.textContent = `${item.name} ${timesWornText}`;

        // Append image and text to the entry
        itemInfo.appendChild(itemImage);
        itemInfo.appendChild(itemText);
        itemEntry.appendChild(itemInfo);

        if (item.is_favorite) {
          const heartIcon = document.createElement("span");
          heartIcon.classList.add("favorite-icon");
          heartIcon.innerHTML = '<i class="fa-solid fa-heart"></i>';
          itemEntry.appendChild(heartIcon);
        } else {
          itemEntry.appendChild(document.createElement("span"));
        }

        outfitElements.appendChild(itemEntry);
      });

      outfitDetails.appendChild(outfitElements);
      outfitList.appendChild(outfitItem);
      outfitList.appendChild(outfitDetails);
    });
  }

  isSameOutfit = (outfit1, outfit2) => {
    if (outfit1.length !== outfit2.length) return false;

    const ids1 = outfit1.map((item) => item.item_id).sort();
    const ids2 = outfit2.map((item) => item.item_id).sort();

    return ids1.every((id, index) => id === ids2[index]);
  };

  generateOutfitSuggestions(wardrobeItems) {
    const maxNumSuggestions = 10;

    const categories = CATEGORIES.reduce((acc, category) => {
      acc[category] = [];
      return acc;
    }, {});

    wardrobeItems.forEach((item) => {
      categories[item.category].push(item);
    });

    const outfits = [];
    for (let i = 0; i < maxNumSuggestions; i++) {
      const outfit = [];

      const hasTopsAndBottoms =
        categories.top.length > 0 && categories.bottoms.length > 0;

      const hasDresses = categories.dress && categories.dress.length > 0;
      const useDress =
        hasDresses && (Math.random() < 0.2 || !hasTopsAndBottoms); // 20% chance to use a dress

      // Select top and bottom or dress if available
      if (useDress) {
        outfit.push(
          categories["dress"][
            Math.floor(Math.random() * categories["dress"].length)
          ]
        );
      } else {
        if (hasTopsAndBottoms) {
          outfit.push(
            categories["top"][
              Math.floor(Math.random() * categories["top"].length)
            ]
          );
          outfit.push(
            categories["bottoms"][
              Math.floor(Math.random() * categories["bottoms"].length)
            ]
          );
        } else {
          return [];
        }
      }

      if (categories.shoes.length > 0) {
        outfit.push(
          categories["shoes"][
            Math.floor(Math.random() * categories["shoes"].length)
          ]
        );
      }

      // Select additional items (jackets, bags, accessories)
      if (Math.random() < 0.5 && categories.jacket.length > 0) {
        outfit.push(
          categories["jacket"][
            Math.floor(Math.random() * categories["jacket"].length)
          ]
        );
      }
      if (Math.random() < 0.5 && categories.accessory.length > 0) {
        outfit.push(
          categories["accessory"][
            Math.floor(Math.random() * categories["accessory"].length)
          ]
        );
      }
      if (Math.random() < 0.5 && categories.bag.length > 0) {
        outfit.push(
          categories["bag"][
            Math.floor(Math.random() * categories["bag"].length)
          ]
        );
      }

      // Check if outfit is unique
      if (
        !outfits.some((existingOutfit) =>
          this.isSameOutfit(existingOutfit, outfit)
        )
      ) {
        outfits.push(outfit);
      }
    }
    return outfits;
  }
}
