import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { WardrobeRepositoryService } from '../../services/WardrobeRepositoryService.js';
import { Events } from '../../eventhub/Events.js';

export class WardrobeDeleteItemForm extends BaseComponent {
  constructor(itemId) {
    super();
    this.itemId = itemId; // The ID of the item to be deleted
    this.wardrobeService = new WardrobeRepositoryService();
    this.loadCSS('WardrobeDeleteItemForm');
  }

  async render() {
    const container = document.createElement('div');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Item';
    deleteButton.classList.add('delete-item-button');

    deleteButton.addEventListener('click', async () => {
      if (confirm('Are you sure you want to delete this item?')) {
        await this.deleteItem();
      }
    });

    container.appendChild(deleteButton);
    return container;
  }

  async deleteItem() {
    try {
      await this.wardrobeService.deleteWardrobeItem(this.itemId); 
      this.publish(Events.UnStoreWardrobeItemSuccess, this.itemId); // Notify other components to refresh
      alert('Item deleted successfully.');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item. Please try again.');
    }
  }
}