import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { WardrobeRepositoryService } from '../../services/WardrobeRepositoryService.js';
import { OutfitRepositoryService } from '../../services/OutfitRepositoryService.js';
import { Events } from '../../eventhub/Events.js';

export class LogAddItem extends BaseComponent {
  #currentOutfit = null;
  #wardrobeItems = [];
  #wardrobeService = null;
  #outfitService = null;
  #container = null;

  constructor() {
    super();
    this.loadCSS('LogAddItem');
    this.#wardrobeService = new WardrobeRepositoryService();
    this.#outfitService = new OutfitRepositoryService();

    this.initialize();
  }

  async initialize() {
    await this.#wardrobeService.initDB();
    await this.#outfitService.initDB();

    // Load wardrobe items
    this.#wardrobeItems = await this.#wardrobeService.loadWardrobeItemsFromDB();

    // Load or create today's outfit
    const today = new Date().toISOString().split('T')[0];
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
        note: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        date: today,
      };
      await this.#outfitService.storeOutfit(this.#currentOutfit);
    }

    // Render the component after initialization
    this.render();
  }

  render() {
    this.#container = document.createElement('div');
    this.#container.classList.add('log-add-item');

    // Title
    const title = document.createElement('h2');
    title.textContent = "Today I'm wearing...";
    this.#container.appendChild(title);

    // Current outfit items container
    const itemsContainer = document.createElement('div');
    itemsContainer.classList.add('current-outfit-items');
    this.#container.appendChild(itemsContainer);

    // Add item button
    const addButton = document.createElement('button');
    addButton.textContent = '+';
    addButton.classList.add('add-item-button');
    addButton.addEventListener('click', () => {
      this.openAddItemModal(itemsContainer);
    });
    this.#container.appendChild(addButton);

    // Display current outfit items
    this.displayCurrentOutfitItems(itemsContainer);

    return this.#container;
  }

  displayCurrentOutfitItems(itemsContainer) {
    // Clear existing items
    itemsContainer.innerHTML = '';

    if (this.#currentOutfit.wardrobe_item_ids.length === 0) {
      const noItemsText = document.createElement('p');
      noItemsText.textContent = 'No items added yet.';
      itemsContainer.appendChild(noItemsText);
    } else {
      this.#currentOutfit.wardrobe_item_ids.forEach((itemId) => {
        const item = this.#wardrobeItems.find((i) => i.item_id === itemId);
        if (item) {
          const itemElement = this.createItemElement(item, itemsContainer);
          itemsContainer.appendChild(itemElement);
        }
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
      this.removeItemFromOutfit(item.item_id, itemsContainer);
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

    this.#wardrobeItems.forEach((item) => {
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
      addItemButton.addEventListener('click', async () => {
        await this.addItemToOutfit(item.item_id, itemsContainer);
        modalOverlay.remove();
      });
      itemElement.appendChild(addItemButton);

      itemsList.appendChild(itemElement);
    });

    modalContent.appendChild(itemsList);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
  }

  async addItemToOutfit(itemId, itemsContainer) {
    if (!this.#currentOutfit.wardrobe_item_ids.includes(itemId)) {
      this.#currentOutfit.wardrobe_item_ids.push(itemId);
      this.#currentOutfit.updated_at = new Date().toISOString();

      // Save the outfit using storeOutfit
      await this.#outfitService.storeOutfit(this.#currentOutfit);

      // Update the UI
      this.displayCurrentOutfitItems(itemsContainer);

      // Update LogViewComponent
      this.updateLogView();
    } else {
      alert('Item already added to outfit.');
    }
  }

  async removeItemFromOutfit(itemId, itemsContainer) {
    const index = this.#currentOutfit.wardrobe_item_ids.indexOf(itemId);
    if (index > -1) {
      this.#currentOutfit.wardrobe_item_ids.splice(index, 1);
      this.#currentOutfit.updated_at = new Date().toISOString();

      // Save the outfit using storeOutfit
      await this.#outfitService.storeOutfit(this.#currentOutfit);

      // Update the UI
      this.displayCurrentOutfitItems(itemsContainer);

      // Update LogViewComponent
      this.updateLogView();
    }
  }

  updateLogView() {
    // Publish an event or directly update the LogViewComponent
    // Assuming we have access to LogViewComponent instance or use events
    this.publish(Events.OutfitUpdated, this.#currentOutfit);
  }
}

// Helper functions
function getCurrentUserId() {
  // Implement a method to get the current logged-in user's ID
  return 'user123';
}

function generateUniqueId() {
  // Simple unique ID generator
  return '_' + Math.random().toString(36).substr(2, 9);
}
