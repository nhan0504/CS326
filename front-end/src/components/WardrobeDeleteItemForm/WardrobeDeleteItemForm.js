import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { WardrobeRepositoryService } from '../../services/WardrobeRepositoryService.js';
import { Events } from '../../eventhub/Events.js';

export class WardrobeDeleteItemForm extends BaseComponent {
  constructor(itemId) {
    super();
    this.itemId = itemId; //The ID of the item to be deleted
    this.wardrobeService = new WardrobeRepositoryService();
    this.loadCSS('WardrobeDeleteItemForm');
  }

  render() {
    this.container = document.createElement('div');
    this.container.style.display = 'none';

    const background = document.createElement("div");
    background.classList.add("background-overlay");
    this.container.appendChild(background);

    const modal = document.createElement("div");
    modal.classList.add("modal");
    this.container.appendChild(modal);

    const closeButton = document.createElement("span");
    closeButton.innerHTML = '<i class="fa-solid fa-x"></i>';
    closeButton.classList.add("close-delete-modal-btn");
    closeButton.addEventListener("click", () => {
      this.hide();
    });
    modal.appendChild(closeButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Item';
    deleteButton.classList.add('delete-item-button');
    modal.appendChild(deleteButton);

    deleteButton.addEventListener('click', async () => {
      if (confirm('Are you sure you want to delete this item?')) {
        await this.deleteItem();
        this.hide();
      }
    });

    return this.container;
  }

  show() {
    this.container.style.display = 'block';
  }

  hide() {
    this.container.style.display = 'none';
  }

  async deleteItem() {
    try {
      const response = await fetch('http://localhost:4000/v1/items/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id: this.itemId }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      this.publish(Events.UnStoreWardrobeItemSuccess, this.itemId);
      alert('Item deleted successfully.');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item. Please try again.');
    }
  }
}
