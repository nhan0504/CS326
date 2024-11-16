import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { OutfitRepositoryService } from '../../services/OutfitRepositoryService.js';
import { Events } from '../../eventhub/Events.js';

export class LogDeleteItem extends BaseComponent {
  constructor(outfitId) {
    super();
    this.outfitId = outfitId; // The ID of the outfit to be deleted
    this.outfitService = new OutfitRepositoryService();
    this.loadCSS('LogDeleteItem');
  }

  async render() {
    await this.outfitService.initDB();

    // Create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Outfit';
    deleteButton.classList.add('delete-log-button');

    // Add event listener for the delete action
    deleteButton.addEventListener('click', async () => {
      await this.deleteOutfit();
    });

    return deleteButton;
  }

  async deleteOutfit() {
    // Delete the outfit from IndexedDB
    await this.outfitService.deleteOutfit(this.outfitId);

    // Publish an event to notify that an outfit was deleted
    this.publish(Events.OutfitDeleted, this.outfitId);
  }
}
