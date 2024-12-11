import { WardrobeItem } from "../../models/WardrobeItem.js";
import { WardrobeRepositoryService } from "../../services/WardrobeRepositoryService.js";
import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { CATEGORIES, OCCASIONS, SEASONS } from "../constants.js";

export class WardrobeUpdateItemForm extends BaseComponent {
  #container = null;
  #wardrobeService = null;
  #itemId = null;

  constructor(itemId) {
    super();
    this.loadCSS("WardrobeUpdateItemForm");
    this.#itemId = itemId;
    this.#wardrobeService = new WardrobeRepositoryService();
  }

  render(displayedWardrobeItems) {
    // Create the main container
    this.#container = document.createElement("div");
    this.#container.classList.add("update-item-container");

    // Grey out the background
    const background = document.createElement("div");
    background.classList.add("background-overlay");
    this.#container.appendChild(background);

    // Create the modal
    const modal = document.createElement("div");
    modal.classList.add("modal");
    this.#container.appendChild(modal);

    // Create the form
    const form = document.createElement("form");
    form.id = "update-wardrobe-item-form";
    form.classList.add("update-item-form");
    modal.appendChild(form);

    // X button to close the modal
    const xButton = document.createElement("span");
    xButton.innerHTML = '<i class="fa-solid fa-x"></i>';
    xButton.classList.add("close-update-modal-btn");
    xButton.addEventListener("click", () => {
      this.hide();
      form.reset();
    });
    modal.appendChild(xButton);

    // Update Form Title
    const title = document.createElement("h2");
    title.textContent = "Update Wardrobe Item";
    title.classList.add("update-item-title");
    form.appendChild(title);

    // Upload image field
    const imageTextLabel = document.createElement("label");
    imageTextLabel.setAttribute("for", "Image");
    imageTextLabel.textContent = "Image";
    imageTextLabel.classList.add("update-item-form-label");
    form.appendChild(imageTextLabel);
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.id = "Image";
    fileInput.accept = "image/*";
    fileInput.required = true;
    fileInput.classList.add("update-item-form-input");
    form.appendChild(fileInput);

    // Create the input fields of the form
    const inputFields = [
      { label: "Title", placeholder: "Item title" },
      { label: "Cost", placeholder: "Item cost ($)" },
      { label: "Size", placeholder: "Item size" },
      { label: "Brand", placeholder: "Item brand" },
    ];
    inputFields.forEach((inputField) => {
      const { label, placeholder } = inputField;

      // Create the label
      const textLabel = document.createElement("label");
      textLabel.setAttribute("for", label);
      textLabel.textContent = label;
      textLabel.classList.add("update-item-form-label");
      form.appendChild(textLabel);

      // Create the input
      const input = document.createElement("input");
      input.type = "text";
      input.id = label;
      input.placeholder = placeholder;
      input.required = true;
      input.classList.add("update-item-form-input");
      form.appendChild(input);
    });

    // Create the seasons checkboxes
    const seasonTextLabel = document.createElement("label");
    seasonTextLabel.textContent = "Seasons";
    seasonTextLabel.classList.add("update-item-form-label");
    form.appendChild(seasonTextLabel);
    const seasonContainer = document.createElement("div");
    SEASONS.forEach((season) => {
      // Create the label
      const textLabel = document.createElement("label");
      textLabel.htmlFor = season;
      textLabel.textContent = season.charAt(0).toUpperCase() + season.slice(1);
      textLabel.classList.add("wardrobe-update-seasons");
      seasonContainer.appendChild(textLabel);

      // Create the input
      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = season;
      input.name = "wardrobe-seasons";
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
      {
        label: "Category",
        options: CATEGORIES,
      },
    ];
    selectFields.forEach((selectField) => {
      const { label, options } = selectField;

      // Create the label
      const textLabel = document.createElement("label");
      textLabel.setAttribute("for", label);
      textLabel.textContent = label;
      textLabel.classList.add("update-item-form-label");
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

    // Add Error Message
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "";
    errorMessage.id = "error-message";
    errorMessage.classList.add("error-message");
    form.appendChild(errorMessage);

    // Submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Update Item";
    submitButton.classList.add("update-wardrobe-item-submit");
    submitButton.addEventListener("click", (event) => {
      event.preventDefault();

      // collect the data from the form
      const formData = this.collectFormData();

      // Get the image
      const imageElement = document.getElementById("Image");
      const files = imageElement.files;
      if (files.length === 0) {
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.textContent = "Please upload an image.";
      }

      // Check if the form input is valid
      const itemIds = displayedWardrobeItems
        .filter((item) => item)
        .map((item) => item.item_id);
      if (files.length > 0 && this.checkValid(formData, itemIds)) {
        // Hide the update item form
        this.hide();

        // Update the item to indexdb
        this.updateItem(formData, files);

        // reset the form
        form.reset();
      }
    });
    form.appendChild(submitButton);

    return this.#container;
  }

  // Show the update form
  show() {
    this.#container.style.display = "block";
  }

  // Hide the update form and reset the error message
  hide() {
    this.#container.style.display = "none";
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = "";
  }

  updateItem(params, files) {
    // Read the image
    const image = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64Image = event.target.result;
      params["image"] = base64Image;

      // Construct the WardrobeItem object
      const wardrobeItem = new WardrobeItem(params);

      // Update the item in indexdb
      this.updateWardrobeItem(wardrobeItem);
    };

    reader.readAsDataURL(image);
  }

  collectFormData() {
    const params = {};
    // Get the title, cost, size, brand, occasion, and category
    const fields = [
      { label: "name", id: "Title" },
      { label: "cost", id: "Cost" },
      { label: "size", id: "Size" },
      { label: "category", id: "Category" },
      { label: "occasion", id: "Occasion" },
      { label: "brand", id: "Brand" },
    ];
    fields.forEach(({ label, id }) => {
      const element = document.getElementById(id);
      const value = element.value;
      params[label] = value;
    });

    // Get the item_id
    params["item_id"] = this.#itemId;

    // Get the seasons
    const selectedSeasons = Array.from(
      document.querySelectorAll("input[name='wardrobe-seasons']:checked")
    ).map((checkbox) => checkbox.value);
    params["seasons"] = selectedSeasons;

    return params;
  }

  async updateWardrobeItem(wardrobeItem) {
    try {
      const wardrobeItemJSON = wardrobeItem.toJSON();
      await this.#wardrobeService.initDB();
      await this.#wardrobeService.updateWardrobeItemsFromSQLite(wardrobeItemJSON);
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
      errorMessageElement.textContent = "Please enter the cost.";
    } else if (isNaN(cost)) {
      errorMessageElement.textContent = "Please enter a number for the cost.";
    } else if (!size) {
      errorMessageElement.textContent = "Please enter the size.";
    } else if (!brand) {
      errorMessageElement.textContent = "Please enter the brand.";
    } else if (seasons.length === 0) {
      errorMessageElement.textContent = "Please select at least one season.";
    } else {
      return true;
    }

    return false;
  }
}
