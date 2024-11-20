import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { WardrobeRepositoryService } from "../../services/WardrobeRepositoryService.js";
import { OutfitRepositoryService } from "../../services/OutfitRepositoryService.js";
import { Events } from "../../eventhub/Events.js";
import { EventHub } from "../../eventhub/EventHub.js";
import { OutfitEntry } from "../../models/OutfitEntry.js";
import { CATEGORIES, OCCASIONS, SEASONS } from "../constants.js";

export class LogAddItem extends BaseComponent {
  #currentOutfit = null;
  #wardrobeItems = [];
  #wardrobeService = null;
  #outfitService = null;
  #container = null;
  #eventHub = null;
  #itemsContainer = null;

  constructor() {
    super();
    this.loadCSS("LogAddItem");
    this.#wardrobeService = new WardrobeRepositoryService();
    this.#outfitService = new OutfitRepositoryService();
    this.#eventHub = new EventHub();

    this.subscribeToWardrobeEvents();
  }

  subscribeToWardrobeEvents() {
    document.addEventListener("StoreWardrobeItemSuccess", () => {
      this.initialize();
    });

    document.addEventListener("UnStoreWardrobeItemSuccess", async () => {
      this.initialize();
    });
  }

  async initialize() {
    await this.#wardrobeService.initDB();
    await this.#outfitService.initDB();

    // Load wardrobe items
    this.#wardrobeItems = await this.#wardrobeService.loadWardrobeItemsFromDB();

    // Load or create today's outfit
    const today = new Date().toISOString().split("T")[0];
    const outfits = await this.#outfitService.loadOutfitFromDB();
    const userId = getCurrentUserId();

    this.#currentOutfit = outfits.find(
      (outfit) => outfit.user_id === userId && outfit.date === today
    );

    if (!this.#currentOutfit) {
      // Create a new outfit for today
      this.#currentOutfit = {
        outfit_id: generateUniqueId(),
        user_id: userId,
        wardrobe_item_ids: [],
        note: "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        date: today,
      };
      await this.#outfitService.storeOutfit(this.#currentOutfit);
    }

    
    this.renderItemsContainer();
  }

  render(){
    // Create the main container
    this.#container = document.createElement("div");
    this.#container.classList.add("add-outfit-container");

    // Grey out the background
    //TODO: figure out how to only grey out background and not form
    // const background = document.createElement("div");
    // background.classList.add("background-overlay");
    // this.#container.appendChild(background);

    // Create the modal
    const modal = document.createElement("div");
    modal.classList.add("modal");
    this.#container.appendChild(modal);

    // Create the form
    const form = document.createElement("form");
    form.id = "add-log-item-outfit";
    form.classList.add("add-outfit-form");
    modal.appendChild(form);

    // X button to close the modal
    const xButton = document.createElement("span");
    xButton.innerHTML = '<i class="fa-solid fa-x"></i>';
    xButton.classList.add("close-add-modal-btn");
    xButton.addEventListener("click", () => {
      this.hide();
      form.reset();
    });
    modal.appendChild(xButton);

    // Add Form Title
    const title = document.createElement("h2");
    title.textContent = "Add New Outfit";
    title.classList.add("add-outfit-title");
    form.appendChild(title);

  
    //TODO: add in modal where wardrobe items are brought up

    // Add item button
    const addButton = document.createElement("button");
    addButton.textContent = "+";
    addButton.classList.add("add-item-button");
    addButton.addEventListener("click", () => {
      this.openAddItemModal();
    });
    this.#container.appendChild(addButton);

    //TODO: Remove this if not needed
    // const itemsAdded = document.createElement("div");
    // itemsAdded.id = "itemsAdded";
    // itemsAdded.classList.add("current-outfit-items");
    // this.#container.appendChild(itemsAdded);

    //TODO: Make sure that items are properly added to the current outfit
    //TODO: Make sure that items are properly deleted from the current outfit 
    
    // Create the input fields of the form
    const inputFields = [
      { label: "Name", placeholder: "Outfit name" },

    ];
    inputFields.forEach((inputField) => {
      const { label, placeholder } = inputField;

      // Create the label
      const textLabel = document.createElement("label");
      textLabel.setAttribute("for", label);
      textLabel.textContent = label;
      textLabel.classList.add("add-outfit-form-label");
      form.appendChild(textLabel);

      // Create the input
      const input = document.createElement("input");
      input.type = "text";
      input.id = label;
      input.placeholder = placeholder;
      input.required = true;
      input.classList.add("add-outfit-form-input");
      form.appendChild(input);
    });

    // Create the seasons checkboxes
    const seasonTextLabel = document.createElement("label");
    seasonTextLabel.textContent = "Seasons";
    seasonTextLabel.classList.add("add-outfit-form-label");
    form.appendChild(seasonTextLabel);
    const seasonContainer = document.createElement("div");
    SEASONS.forEach((season) => {
      // Create the label
      const textLabel = document.createElement("label");
      textLabel.htmlFor = season;
      textLabel.textContent = season.charAt(0).toUpperCase() + season.slice(1);
      textLabel.classList.add("outfit-add-seasons");
      seasonContainer.appendChild(textLabel);

      // Create the input
      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = season;
      input.name = "outfit-seasons";
      input.value = season;
      seasonContainer.appendChild(input);
    });
    form.appendChild(seasonContainer);

    // Create the select fields of the form
    const selectFields = [
      {
        label: "Occasion",
        options: OCCASIONS,
      },
    ];
    selectFields.forEach((selectField) => {
      const { label, options } = selectField;

      // Create the label
      const textLabel = document.createElement("label");
      textLabel.setAttribute("for", label);
      textLabel.textContent = label;
      textLabel.classList.add("add-outfit-form-label");
      form.appendChild(textLabel);

      // Create the select field
      const select = document.createElement("select");
      select.id = label;
      options.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent =
          option.charAt(0).toUpperCase() + option.slice(1);
        select.appendChild(optionElement);
      });
      select.required = true;
      form.appendChild(select);
    });

    // Add Notes Field
    const notesLabel = document.createElement("label");
    notesLabel.setAttribute("for", "Notes");
    notesLabel.textContent = "Notes";
    notesLabel.classList.add("add-outfit-form-label");
    form.appendChild(notesLabel);

    const notesTextarea = document.createElement("textarea");
    notesTextarea.id = "Notes";
    notesTextarea.placeholder = "Add any notes or details here...";
    notesTextarea.classList.add("add-outfit-form-input");
    notesTextarea.rows = 5; // Adjust rows for height
    form.appendChild(notesTextarea);

    // Add Error Message
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "";
    errorMessage.id = "error-message";
    errorMessage.classList.add("error-message");
    form.appendChild(errorMessage);

    // Submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Add Outfit";
    submitButton.classList.add("add-outfit-item-submit");
    submitButton.addEventListener("click", (event) => {
      event.preventDefault();

      // collect the data from the form
      const formData = this.collectFormData();

      // Check if the form input is valid
      const itemIds = displayedWardrobeItems
        .filter((item) => item)
        .map((item) => item.item_id);
      if (this.checkValid(formData, itemIds)) {
        // hide the add outfit form
        this.hide();

        // add the item to indexdb
        this.addOutfit(formData, files, displayedWardrobeItems);

        //TODO: ^change this function call

        // reset the form
        form.reset();
      }
    });
    form.appendChild(submitButton);

    this.initialize();

    return this.#container;
  }

  renderItemsContainer () {
    this.#itemsContainer = document.createElement("div");
    this.#itemsContainer.id = "itemsContainer";
    this.#itemsContainer.classList.add("current-outfit-items");
    this.#container.appendChild(this.#itemsContainer);

    // Clear existing items
    if (!this.#currentOutfit) {
      return;
    } else {
      this.#itemsContainer.innerHTML = "";
    }

    if (this.#currentOutfit.wardrobe_item_ids.length === 0) {
      const noItemsText = document.createElement("p");
      noItemsText.textContent = "No items added yet.";
      this.#itemsContainer.appendChild(noItemsText);
    } else {
      this.#currentOutfit.wardrobe_item_ids.forEach((itemId) => {
        const item = this.#wardrobeItems.find((i) => i.item_id === itemId);
        if (item) {
          const itemElement = this.createItemElement(item);
          this.#itemsContainer.appendChild(itemElement);
        }
      });
    }
  }

  showItemsContainer() {
    this.#itemsContainer.style.display = "block";
  }

  // Show the add form
  show() {
    this.#container.style.display = "block";
  }

  // Hide the add form and reset the error message
  hide() {
    this.#container.style.display = "none";
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = "";
  }

  addItem(params, files, displayedWardrobeItems) {
    // Read the image
    const image = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64Image = event.target.result;
      params["image"] = base64Image;

      //TODO: check the params

      // Construct the WardrobeItem object
      const logOutfit = new OutfitEntry(params);

      //TODO: get rid of this and rerender outfits, don't forget to use displayedWardrobeItems
      // Display the new item without rerendering everything
      renderWardrobeItems(
        [wardrobeItem],
        this.#wardrobeService,
        displayedWardrobeItems
      );
      displayedWardrobeItems.push(wardrobeItem);

      //TODO: switch this over to store the new outfit in indexdb
      // Store the item in indexdb
      this.storeWardrobeItem(wardrobeItem);
    };

    reader.readAsDataURL(image);

  }

  createItemElement(item) {
    const itemElement = document.createElement("div");
    itemElement.classList.add("outfit-item");

    // Item image
    const itemImage = document.createElement("img");
    itemImage.src = item.image;
    itemImage.alt = item.name;
    itemElement.appendChild(itemImage);

    // Item name
    const itemName = document.createElement("p");
    itemName.textContent = item.name;
    itemElement.appendChild(itemName);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.classList.add("delete-item-button");
    deleteButton.addEventListener("click", () => {
      this.removeItemFromOutfit(item.item_id);
    });
    itemElement.appendChild(deleteButton);

    return itemElement;
  }


  openAddItemModal() {
    // Create modal overlay
    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");

    // Modal content
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    // Close button
    const closeButton = document.createElement("span");
    closeButton.classList.add("close-button");
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", () => {
      modalOverlay.remove();
    });
    modalContent.appendChild(closeButton);

    // Title
    const modalTitle = document.createElement("h3");
    modalTitle.textContent = "Select Items to Add";
    modalContent.appendChild(modalTitle);

    // Items list
    const itemsList = document.createElement("div");
    itemsList.classList.add("items-list");

    this.#wardrobeItems.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("log-wardrobe-item");

      // Item image
      const itemImage = document.createElement("img");
      itemImage.src = item.image;
      itemImage.alt = item.name;
      itemElement.appendChild(itemImage);

      // Item name
      const itemName = document.createElement("p");
      itemName.textContent = item.name;
      itemElement.appendChild(itemName);

      // Add button
      const addItemButton = document.createElement("button");
      addItemButton.textContent = "Add";
      addItemButton.addEventListener("click", async () => {
        await this.addItemToOutfit(item.item_id);
        modalOverlay.remove();
      });
      itemElement.appendChild(addItemButton);

      itemsList.appendChild(itemElement);
    });

    modalContent.appendChild(itemsList);
    modalOverlay.appendChild(modalContent);
    this.#container.appendChild(modalOverlay);
  }

  async addItemToOutfit(itemId) {
    if (!this.#currentOutfit.wardrobe_item_ids.includes(itemId)) {
      this.#currentOutfit.wardrobe_item_ids.push(itemId);
      this.#currentOutfit.updated_at = new Date().toISOString();

      // Save the outfit using storeOutfit
      await this.#outfitService.deleteOutfit(this.#currentOutfit.id);
      await this.#outfitService.storeOutfit(this.#currentOutfit);

      // Update the UI
      this.renderItemsContainer();

      // Update LogViewComponent
      this.updateLogView();
    } else {
      alert("Item already added to outfit.");
    }
  }

  async removeItemFromOutfit(itemId) {
    const index = this.#currentOutfit.wardrobe_item_ids.indexOf(itemId);
    if (index > -1) {
      this.#currentOutfit.wardrobe_item_ids.splice(index, 1);
      this.#currentOutfit.updated_at = new Date().toISOString();

      // Save the outfit using storeOutfit
      await this.#outfitService.deleteOutfit(this.#currentOutfit.id);
      await this.#outfitService.storeOutfit(this.#currentOutfit);

      // Update the UI
      this.renderItemsContainer();

      // Update LogViewComponent
      this.updateLogView();
    }
  }

  collectFormData() {
    const params = {};
    // Get the title, cost, size, brand, occasion, and category
    const fields = [
      { label: "name", id: "Title" },
      { label: "items", id: "Items"},
      { label: "occasion", id: "Occasion" },
      { label: "seasons", id: "Seasons"}, //TODO: not sure if i have to remove this
      { label: "notes", id: "Notes"}
    ];
    fields.forEach(({ label, id }) => {
      const element = document.getElementById(id);
      const value = element.value;
      params[label] = value;
    });

    // Get the item_id
    params["item_id"] = params.name;

    // Get the seasons
    const selectedSeasons = Array.from(
      document.querySelectorAll("input[name='outfit-seasons']:checked")
    ).map((checkbox) => checkbox.value);
    params["seasons"] = selectedSeasons;

    return params;
  }

  async storeWardrobeItem(wardrobeItem) {
    try {
      const wardrobeItemJSON = wardrobeItem.toJSON();
      await this.#wardrobeService.initDB();
      await this.#wardrobeService.storeWardrobeItem(wardrobeItemJSON);
    } catch (e) {
      console.error("Error:", e);
    }
  }

  checkValid(formData, itemIds) {
    const { item_id, name, cost, size, brand, seasons } = formData;

    const errorMessageElement = document.getElementById("error-message");
    if (!name) {
      errorMessageElement.textContent = "Please enter a title.";
    } else if (!cost) {
      errorMessageElement.textContent = "Please enter a number for the cost.";
    } else if (seasons.length === 0) {
      errorMessageElement.textContent = "Please select at least one season.";
    } else if (itemIds.includes(item_id)) {
      errorMessageElement.textContent =
        "This title is already in use. Please enter a new title.";
    } else {
      return true;
    }
    //TODO: write cases for items, dates, and notes
    //TODO: Add date parameter to form
    //TODO: Make sure that updated_at gets updated

    return false;
  }

  updateLogView() {
    // Publish an event or directly update the LogViewComponent
    // Assuming we have access to LogViewComponent instance or use events
    this.#eventHub.publish(Events.OutfitUpdated, this.#currentOutfit);
  }
}

// Helper functions
function getCurrentUserId() {
  // Implement a method to get the current logged-in user's ID
  //TODO: Implement this
  return "user123";
}

function generateUniqueId() {
  // Simple unique ID generator
  //TODO: Implement this
  return "_" + Math.random().toString(36).substr(2, 9);
}

//TODO: re-render with events and take out other re-rendering

//TODO: Implement daily outfit thing where outfit of the day is displayed and the container doesn't show up if not


//TODO: replace or get rid of displayedWardrobeItems parameter