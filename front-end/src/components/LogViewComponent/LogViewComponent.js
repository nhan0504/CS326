import { loadOutfitItems, getTestOutfits,getTestWardrobeItems } from '../../testing/TestData.js';
import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { WardrobeRepositoryService } from "../../services/WardrobeRepositoryService.js";
import { OutfitRepositoryService } from "../../services/OutfitRepositoryService.js";
import { WardrobeItem } from "../../models/WardrobeItem.js";
import { LogAddItem } from '../LogAddItem/LogAddItem.js'; // Import LogAddItem component
import { LogDeleteItem } from '../LogDeleteItem/LogDeleteItem.js'; // Import LogDeleteItem component
import { Events } from '../../eventhub/Events.js'; // Import Events for event handling
import { EventHub } from '../../eventhub/EventHub.js';

export class LogViewComponent extends BaseComponent {
  #container = null;
  #wardrobeItems = [];
  #wardrobeService = null;
  #outfitItems = [];
  #outfitService = null;
  #eventHub = null;

  constructor(LogViewData = {}) {
    super();
    this.LogViewData = LogViewData;
    this.loadCSS("LogViewComponent");
    this.#wardrobeService = new WardrobeRepositoryService();
    this.#outfitService = new OutfitRepositoryService();
    this.loadOutfitItems();
    this.subscribeToWardrobeEvents();
  }

  async loadOutfitItems() {
    try {
      await this.#outfitService.initDB();
      this.#outfitItems =
        await this.#outfitService.loadOutfitFromDB();
      await this.#wardrobeService.initDB();
      this.#wardrobeItems =
          await this.#wardrobeService.loadWardrobeItemsFromDB();
      // Commented out the following line because we will render the outfits in the render method
      this.applyFilters(this.#outfitItems);
    } catch (e) {
      console.error("Error:", e);
    }
  }

  render() {
    //loadOutfitItems();
    //uncomment to load outfit
    let outfits = this.#outfitItems;
    // Create the main container
    this.#container = document.createElement("div");
    this.#container.classList.add("view");
    this.#container.id = "logView";
    this.#container.style.display = "none";

    // Create the LogAddItem component and append it
    const logAddItemComponent = new LogAddItem();
    const logAddItemElement = logAddItemComponent.render();
    this.#container.appendChild(logAddItemElement);

    // Create the outfit container
    const logContainer = document.createElement("div");
    logContainer.classList.add("log-container");

     // Create the outfit list
    const outfitListDiv = document.createElement("div");
    outfitListDiv.id="outfitList";
    if (outfits.length>0 && this.#wardrobeItems>0)
      outfits.forEach(e=> this.createOutfitLog(e," "));

    outfitListDiv.classList.add("outfit-list");
    
    // Create the filter bar
    const filterBar = this.createFilterBar(this.#outfitItems);
    logContainer.appendChild(filterBar);
    logContainer.appendChild(outfitListDiv);
    
    // Append outfit container to main container
    this.#container.appendChild(logContainer);

  // Render the outfit logs after the container is appended to the DOM
  if (this.#outfitItems.length > 0 && this.#wardrobeItems.length > 0)
    this.#outfitItems.forEach(e => this.createOutfitLog(e, " "));

    return this.#container;
  }

  subscribeToWardrobeEvents() {
    document.addEventListener('StoreWardrobeItemSuccess', (event) => {
      this.loadOutfitItems();
    });
  
    document.addEventListener('StoreWardrobeItemFailure', (event) => {
      console.error('Failed to delete wardrobe item:');
    });
    
    document.addEventListener('UnStoreWardrobeItemSuccess', async () => {
      console.log('All wardrobe items cleared');
      this.loadOutfitItems();
    });
  
    document.addEventListener('UnStoreWardrobeItemFailure', (event) => {
      console.error('Failed to clear wardrobe items:');
      alert('Failed to clear wardrobe items. Please try again.');
    });
  }

  createFilterBar(outfits) {
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
      this.applyFilters(this.#outfitItems);
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
    
    const today = new Date().toISOString().split('T')[0];
    let filteredItems = outfits.filter(outfit => outfit.date !== today);

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
    const outfitListDiv = document.getElementById("outfitList");
    outfitListDiv.innerHTML="";
    filteredItems.forEach(e=> this.createOutfitLog(e," "));
    return filteredItems;
  }
  
  createOutfitLog(outfit,msg)
  {
    const today = new Date().toISOString().split('T')[0];
    if (outfit.date == today) return;

    const outfitListDiv = document.getElementById("outfitList");
    let tempWardrobeItems=[];
    if (outfit.length === 0) {
      alert("No clothes");
      return;
    }
    const items =  this.#wardrobeItems;
    outfit.wardrobe_item_ids.forEach((x=>items.forEach(i=>i.item_id===x? tempWardrobeItems.push(i):0)));
    const logItem= document.createElement("div");
    logItem.classList.add('logItem');
    //logItem.id = 'logItem';
    logItem.id = `outfit-${outfit.outfit_id}`; // Set unique ID for the outfit log


    const logInfo= document.createElement("div");
    logInfo.classList.add('logInfo');

    const text = document.createElement('p');
    const date = document.createElement('p');
    const datearr =outfit.created_at.toString().slice(0,10).split("-").reverse();
    let tmp =datearr[0];
    datearr[0]=datearr[1];
    datearr[1]=tmp;
    date.textContent =datearr.join("-");
    //format : currently mm-dd-yyyy
    text.textContent = msg;
    const logGrid = document.createElement("div");
    logGrid.classList.add("logGrid");
    
    // const heartItem = document.createElement("div");
    // heartItem.classList.add("heartItem");
    // const heartIcon = document.createElement("span");
    // heartIcon.classList.add("fave");
    //   heartIcon.innerHTML = '<i class="fa-solid fa-heart"></i>';
    //   // Make the favorite button red and update the item when clicked
    //   heartIcon.onclick = function () {
    //     if (heartIcon.classList.contains("fave")) {
    //       heartIcon.classList.remove("fave");
    //       heartIcon.classList.add("fave-red");
    //     } else {
    //       heartIcon.classList.remove("fave-red");
    //       heartIcon.classList.add("fave");
    //     }
    //   };
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
    logInfo.appendChild(date);
    logInfo.appendChild(text);
//    logInfo.appendChild(heartIcon);
//    logInfo.appendChild(heartItem);
    logItem.appendChild(logInfo);
    logItem.appendChild(logGrid);
    outfitListDiv.appendChild(logItem);
  }

  refreshOutfitList() {
    // Method to refresh the outfit list when outfits are updated
    this.loadOutfitItems(); // Reload outfits from IndexedDB
    const outfitListDiv = document.getElementById("outfitList");
    outfitListDiv.innerHTML = ""; // Clear the existing list
    if (this.#outfitItems.length > 0 && this.#wardrobeItems.length > 0) {
      this.#outfitItems.forEach(e => this.createOutfitLog(e, " "));
    }
  }

  removeOutfitFromList(outfitId) {
    // Method to remove a deleted outfit from the display
    const outfitListDiv = document.getElementById("outfitList");
    const outfitLogElement = document.getElementById(`outfit-${outfitId}`);
    if (outfitLogElement) {
      outfitListDiv.removeChild(outfitLogElement);
    }
  }
}
