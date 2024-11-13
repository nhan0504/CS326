import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class LogDeleteItem extends BaseComponent {
  constructor(logItemElement, onDeleteCallback) {
    super();
    this.logItemElement = logItemElement; // The DOM element representing the log item
    this.onDeleteCallback = onDeleteCallback; // Callback function to execute on deletion
    this.loadCSS('LogDeleteItem');
  }

  render() {
    // Create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-log-button');

    // Add event listener for the delete action
    deleteButton.addEventListener('click', () => {
      this.deleteLogItem();
    });

    return deleteButton;
  }

  deleteLogItem() {
    // Call the callback function to delete the log item
    if (typeof this.onDeleteCallback === 'function') {
      this.onDeleteCallback(this.logItemElement);
    }
  }
}
