import { getTestOutfits,getTestWardrobeItems } from '../../testing/TestData.js';
import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { WardrobeItem } from "../../models/WardrobeItem.js";
export class LogViewComponent extends BaseComponent {
  #container = null;

  constructor(LogViewData = {}) {
    super();
    this.LogViewData = LogViewData;
    this.loadCSS("LogViewComponent");
  }

  render() {
    let outfits = getTestOutfits();

    // Create the main container
    this.#container = document.createElement("div");
    this.#container.classList.add("view");
    this.#container.id = "logView";
    this.#container.style.display = "none";

    // Create the outfit container
    const logContainer = document.createElement("div");
    logContainer.classList.add("log-container");

     // Create the outfit list
    const outfitListDiv = document.createElement("div");
    outfits.forEach(e=> this.createOutfitLog(outfitListDiv,e," "));

    outfitListDiv.classList.add("outfit-list");
    
    // Create the filter bar
    const filterBar = this.createFilterBar(outfitListDiv,outfits);
    logContainer.appendChild(filterBar);
    logContainer.appendChild(outfitListDiv);
    
    // Append outfit container to main container
    this.#container.appendChild(logContainer);

    return this.#container;
  }

  createFilterBar(outfitListDiv,outfits) {
    const filterBar = document.createElement("div");
    filterBar.classList.add("log-filter-bar");

    const filterTitle = document.createElement("h2");
    filterTitle.textContent = "Filters";
    filterBar.appendChild(filterTitle);

    // Search bar
    const searchDiv = document.createElement("div");
    searchDiv.classList.add("search-div")
    const searchLabel = document.createElement("label");
    searchLabel.htmlFor = "log-search";
    searchLabel.textContent = "Search:";

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.id = "log-search";
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
      seasonCheckbox.id = "log-" + season;
      seasonCheckbox.name = "log-seasons";
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
    occasionSelect.id = "log-occasion";
    occasionSelect.name = "log-occasion";

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
      option.textContent =
        optionValue.charAt(0).toUpperCase() + optionValue.slice(1);
      occasionSelect.appendChild(option);
    });

    occasionDiv.appendChild(occasionLabel);
    occasionDiv.appendChild(occasionSelect);
    filterBar.appendChild(occasionDiv);

    // Date range filter
    const dateRangeDiv = document.createElement("div");
    const dateRangeLabel = document.createElement("label");
    dateRangeLabel.textContent = "Date Range:";

    const startDateInput = document.createElement("input");
    startDateInput.type = "date";
    startDateInput.id = "log-start-date";

    const endDateInput = document.createElement("input");
    endDateInput.type = "date";
    endDateInput.id = "log-end-date";

    dateRangeDiv.appendChild(dateRangeLabel);
    dateRangeDiv.appendChild(startDateInput);
    dateRangeDiv.appendChild(endDateInput);

    filterBar.appendChild(dateRangeDiv);
    // Apply filters button
    const applyFiltersButton = document.createElement("button");
    applyFiltersButton.textContent = "Apply Filters";
    applyFiltersButton.classList.add("log-apply-filters-button");
    applyFiltersButton.addEventListener("click", () => {
      this.applyFilters(outfitListDiv,outfits);
    });

    // Wrap the button in a div
    const buttonWrapper = document.createElement("div");
    buttonWrapper.style.display = "flex";
    buttonWrapper.style.justifyContent = "center";
    buttonWrapper.appendChild(applyFiltersButton);

    filterBar.appendChild(buttonWrapper);
    return filterBar;
  }

  applyFilters(outfitListDiv,outfits) {
    const selectedSeasons = Array.from(
      document.querySelectorAll("input[name='log-seasons']:checked")
    ).map((cb) => cb.value);
    const selectedOccasion = document.getElementById("log-occasion").value;
  
    const startDateValue = document.getElementById("log-start-date").value;
    const endDateValue = document.getElementById("log-end-date").value;
    const startDate = startDateValue ? new Date(startDateValue) : null;
    const endDate = endDateValue ? new Date(endDateValue) : null;

    const searchTerm = document.getElementById("log-search").value.toLowerCase();

    let filteredItems = outfits;

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
        (item) => item.occasion === selectedOccasion
      );
    }

    // Filter by date range
    if (startDate || endDate) {
      filteredItems = filteredItems.filter((item) => {
        const itemDate = new Date(item.updated_at);
        return (
          (!startDate || itemDate >= startDate) &&
          (!endDate || itemDate <= endDate)
        );
      });
    }
    
    // Filter by search term
    if (searchTerm) {
      filteredItems = filteredItems.filter((item) =>
        item.outfit_id.toString().includes(searchTerm) ||
        item.wardrobe_item_ids.some((id) => id.toString().includes(searchTerm)) ||
        item.note.toLowerCase().includes(searchTerm)
      );
    }

    outfitListDiv.innerHTML="";
    filteredItems.forEach(e=> this.createOutfitLog(outfitListDiv,e," "));
    return filteredItems;
  }
  createOutfitLog(outfitListDiv,outfit,msg)
  {
    const tempWardrobeItems=[];
    if (outfit.length === 0) {
      alert("No clothes");
      return;
    }
    const items =  getTestWardrobeItems();
    outfit.wardrobe_item_ids.forEach((x=>items.forEach(i=>i.item_id===x? tempWardrobeItems.push(i):0)));
    if (outfit.length === 0) {
      alert("No clothes");
      return;
    }
    const logItem= document.createElement("div");
    logItem.classList.add('logItem');
    logItem.id = 'logItem';

    const logInfo= document.createElement("div");
    logInfo.classList.add('logInfo');

    const text = document.createElement('p');
    const date = document.createElement('p');
    date.textContent = outfit.created_at;
    text.textContent = msg;
    const logGrid = document.createElement("div");
    logGrid.classList.add("logGrid");
    
    const heartItem = document.createElement("div");
    heartItem.classList.add("heartItem");
    const heartIcon = document.createElement("span");
    heartIcon.classList.add("favorite-icon");
      heartIcon.innerHTML = '<i class="fa-solid fa-heart"></i>';
      // Make the favorite button red and update the item when clicked
      heartIcon.onclick = function () {
        if (heartIcon.classList.contains("favorite-icon")) {
          heartIcon.classList.remove("favorite-icon");
          heartIcon.classList.add("favorite-icon-red");
        } else {
          heartIcon.classList.remove("favorite-icon-red");
          heartIcon.classList.add("favorite-icon");
        }
      };
    // Create each wardrobe item and add it to the grid
    tempWardrobeItems.forEach((item) => {
      // Crate the item container
      const logClothesItem = document.createElement("div");
      logClothesItem.classList.add("logClothesItem");
      // Add item image
      const image = document.createElement("img");
      image.classList.add("logClothesItemImage");
      image.src = item.image;
      image.alt = item.name;
      logClothesItem.appendChild(image);
      // Add item name
      const name = document.createElement("p");
      name.textContent = item.name;
      // Add item to the grid
      logClothesItem.appendChild(name);
      logGrid.appendChild(logClothesItem);
    });
    logItem.appendChild(date);
    logInfo.appendChild(text);
    logInfo.appendChild(heartIcon);
    logInfo.appendChild(heartItem);
    logItem.appendChild(logInfo);
    logItem.appendChild(logGrid);
    outfitListDiv.appendChild(logItem);
  }
}