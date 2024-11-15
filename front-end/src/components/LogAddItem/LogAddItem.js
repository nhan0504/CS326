import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { getTestWardrobeItems } from "../../testing/TestData.js";

export class LogAddItem extends BaseComponent {
  #currentOutfitItems = [];

  constructor() {
    super();
    this.loadCSS('LogAddItem');
  }

  render() {
    const container = document.createElement('div');
    container.classList.add('log-add-item');

    // Title
    const title = document.createElement('h2');
    title.textContent = "Today I'm wearing...";
    container.appendChild(title);

    // Current outfit items container
    const itemsContainer = document.createElement('div');
    itemsContainer.classList.add('current-outfit-items');
    container.appendChild(itemsContainer);

    // Add item button
    const addButton = document.createElement('button');
    addButton.textContent = '+';
    addButton.classList.add('add-item-button');
    addButton.addEventListener('click', () => {
      this.openAddItemModal(itemsContainer);
    });
    container.appendChild(addButton);

    // Display current outfit items
    this.displayCurrentOutfitItems(itemsContainer);

    return container;
  }

  displayCurrentOutfitItems(itemsContainer) {
    // Clear existing items
    itemsContainer.innerHTML = '';

    if (this.#currentOutfitItems.length === 0) {
      const noItemsText = document.createElement('p');
      noItemsText.textContent = 'No items added yet.';
      itemsContainer.appendChild(noItemsText);
    } else {
      this.#currentOutfitItems.forEach((item) => {
        const itemElement = this.createItemElement(item, itemsContainer);
        itemsContainer.appendChild(itemElement);
      });
    }
  }

  createItemElement(item, itemsContainer) {
    const itemElement = document.createElement('div');
    itemElement.classList.add('outfit-item');

    // Item image
    const itemImage = document.createElement('img');
    itemImage.src = item.image;
    itemImage.alt = item.name;
    itemElement.appendChild(itemImage);

    // Item name
    const itemName = document.createElement('p');
    itemName.textContent = item.name;
    itemElement.appendChild(itemName);

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'x';
    deleteButton.classList.add('delete-item-button');
    deleteButton.addEventListener('click', () => {
      this.removeItemFromOutfit(item, itemsContainer);
    });
    itemElement.appendChild(deleteButton);

    return itemElement;
  }

  openAddItemModal(itemsContainer) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');

    // Modal content
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    // Close button
    const closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', () => {
      modalOverlay.remove();
    });
    modalContent.appendChild(closeButton);

    // Title
    const modalTitle = document.createElement('h3');
    modalTitle.textContent = 'Select Items to Add';
    modalContent.appendChild(modalTitle);

    // Items list
    const itemsList = document.createElement('div');
    itemsList.classList.add('items-list');

    // Get test wardrobe items
    const wardrobeItems = getTestWardrobeItems();

    wardrobeItems.forEach((item) => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('wardrobe-item');

      // Item image
      const itemImage = document.createElement('img');
      itemImage.src = item.image;
      itemImage.alt = item.name;
      itemElement.appendChild(itemImage);

      // Item name
      const itemName = document.createElement('p');
      itemName.textContent = item.name;
      itemElement.appendChild(itemName);

      // Add button
      const addItemButton = document.createElement('button');
      addItemButton.textContent = 'Add';
      addItemButton.addEventListener('click', () => {
        this.addItemToOutfit(item, itemsContainer);
        modalOverlay.remove();
      });
      itemElement.appendChild(addItemButton);

      itemsList.appendChild(itemElement);
    });

    modalContent.appendChild(itemsList);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
  }

  addItemToOutfit(item, itemsContainer) {
    if (!this.#currentOutfitItems.includes(item)) {
      this.#currentOutfitItems.push(item);
      this.displayCurrentOutfitItems(itemsContainer);
    } else {
      alert('Item already added to outfit.');
    }
  }

  removeItemFromOutfit(item, itemsContainer) {
    const index = this.#currentOutfitItems.indexOf(item);
    if (index > -1) {
      this.#currentOutfitItems.splice(index, 1);
      this.displayCurrentOutfitItems(itemsContainer);
    }
  }
}
