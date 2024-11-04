import { getTestOutfits } from '../../testing/TestData.js';
import { BaseComponent } from '../BaseComponent/BaseComponent.js';

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

    // Create the filter bar
    const filterBar = this.createFilterBar(outfits);
    logContainer.appendChild(filterBar);

    // Create the outfit list
    const outfitListDiv = document.createElement("div");
    logContainer.appendChild(outfitListDiv);
    
    // Append outfit container to main container
    this.#container.appendChild(logContainer);

    console.log(outfits);
    return this.#container;
  }

  createFilterBar(outfits) {
    const filterBar = document.createElement("div");
    filterBar.classList.add("log-filter-bar");

    const filterTitle = document.createElement("h2");
    filterTitle.textContent = "Filters";
    filterBar.appendChild(filterTitle);

    // Search bar
    const searchDiv = document.createElement("div");
    const searchLabel = document.createElement("label");
    searchLabel.htmlFor = "log-search";
    searchLabel.textContent = "Search:";

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.id = "log-search";
    searchInput.placeholder = "Search by outfit ID, wardrobe item IDs, or notes";

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
      this.applyFilters(outfits);
    });

    // Wrap the button in a div
    const buttonWrapper = document.createElement("div");
    buttonWrapper.style.display = "flex";
    buttonWrapper.style.justifyContent = "center";
    buttonWrapper.appendChild(applyFiltersButton);

    filterBar.appendChild(buttonWrapper);
    return filterBar;
  }

  applyFilters(outfits) {
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

    console.log(filteredItems);
    
    return filteredItems;
  }

}
