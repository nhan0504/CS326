import { BaseComponent } from "../BaseComponent/BaseComponent.js";
import { categories, occasions, seasons } from "../constants.js";

export class WardrobeAddItemForm extends BaseComponent {
  #container = null;

  constructor() {
    super();
    this.loadCSS("WardrobeAddItemForm");
  }

  render() {
    // Create the main container
    this.#container = document.createElement("div");
    this.#container.classList.add("add-item-container");

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
    form.id = "add-wardrobe-item-form";
    form.classList.add("add-item-form");
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
    title.textContent = "Add New Wardrobe Item";
    title.classList.add("add-item-title");
    form.appendChild(title);

    // Upload image field
    const imageTextLabel = document.createElement("label");
    imageTextLabel.setAttribute("for", "Image");
    imageTextLabel.textContent = "Image";
    form.appendChild(imageTextLabel);
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.id = "Image";
    fileInput.accept = "image/*";
    fileInput.required = true;
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
      form.appendChild(textLabel);

      // Create the input
      const input = document.createElement("input");
      input.type = "text";
      input.id = label;
      input.placeholder = placeholder;
      input.required = true;
      form.appendChild(input);
    });

    // Create the select fields of the form
    const selectFields = [
      { label: "Season", options: seasons },
      {
        label: "Occasion",
        options: occasions,
      },
      {
        label: "Category",
        options: categories,
      },
    ];
    selectFields.forEach((selectField) => {
      const { label, options } = selectField;

      // Create the label
      const textLabel = document.createElement("label");
      textLabel.setAttribute("for", label);
      textLabel.textContent = label;
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

    // Submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Add Item";
    submitButton.classList.add("add-wardrobe-item-submit");
    form.appendChild(submitButton);

    return this.#container;
  }

  // Show the add form
  show() {
    this.#container.style.display = "block";
  }

  // Hide the add form
  hide() {
    this.#container.style.display = "none";
  }
}
