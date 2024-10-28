import { Events } from '../eventhub/Events.js';
import Service from './Service.js';

export class WardrobeRepositoryService extends Service {
  constructor() {
    super();
    this.dbName = 'wardrobeDB';
    this.storeName = 'wardrobeItem';
    this.db = null;

    // Initialize the database
    this.initDB()
      .then(() => {
        this.loadWardrobeItemsFromDB(); // Load wardrobe items on initialization
      })
      .catch(error => {
        console.error(error);
      });
  }

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = event => {
        const db = event.target.result;
        db.createObjectStore(this.storeName, {
          keyPath: 'id',
          autoIncrement: true,
        });
      };

      request.onsuccess = event => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = event => {
        reject('Error initializing IndexedDB');
      };
    });
  }

  async storeWardrobeItem(wardrobeItemData) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(wardrobeItemData);

      request.onsuccess = () => {
        this.publish(Events.StoreWardrobeItemSuccess, wardrobeItemData);
        resolve('Wardrobe item stored successfully');
      };

      request.onerror = () => {
        this.publish(Events.StoreWardrobeItemFailure, wardrobeItemData);
        reject('Error storing wardrobe item:');
      };
    });
  }

  async loadWardrobeItemsFromDB() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = event => {
        const wardrobeItems = event.target.result;
        wardrobeItems.forEach(item => this.publish('NewWardrobeItem', item));
        resolve(wardrobeItems);
      };

      request.onerror = () => {
        this.publish(Events.LoadWardrobeItemFailure);
        reject('Error retrieving wardrobe items');
      };
    });
  }

  async clearWardrobeItems() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => {
        this.publish(Events.UnStoreWardrobeItemSuccess);
        resolve('All wardrobe items cleared');
      };

      request.onerror = () => {
        this.publish(Events.UnStoreWardrobeItemFailure);
        reject('Error clearing wardrobe items');
      };
    });
  }

  addSubscriptions() {
    this.subscribe(Events.StoreWardrobeItem, data => {
      this.storeWardrobeItem(data);
    });

    this.subscribe(Events.UnStoreWardrobeItem, () => {
      this.clearWardrobeItems();
    });
  }
}
