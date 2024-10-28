import { Events } from '../eventhub/Events.js';
import Service from './Service.js';

export class OutfitRepositoryService extends Service {
  constructor() {
    super();
    this.dbName = 'outfitDB';
    this.storeName = 'outfits';
    this.db = null;

    // Initialize the database
    this.initDB()
      .then(() => {
        this.loadOutfitsFromDB(); // Load outfits on initialization
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

  async storeOutfit(OutfitData) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(OutfitData);

      request.onsuccess = () => {
        this.publish(Events.StoreOutfitSuccess, OutfitData);
        resolve('Outfit stored successfully');
      };

      request.onerror = () => {
        this.publish(Events.StoreOutfitFailure, OutfitData);
        reject('Error storing outfit: ');
      };
    });
  }

  async loadOutfitsFromDB() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = event => {
        const outfits = event.target.result;
        outfits.forEach(outfit => this.publish('NewOutfit', outfit));
        resolve(outfits);
      };

      request.onerror = () => {
        this.publish(Events.LoadOutfitsFailure);
        reject('Error retrieving outfits');
      };
    });
  }

  async clearOutfits() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => {
        this.publish(Events.UnStoreOutfitsSuccess);
        resolve('All outfits cleared');
      };

      request.onerror = () => {
        this.publish(Events.UnStoreOutfitsFailure);
        reject('Error clearing outfits');
      };
    });
  }

  addSubscriptions() {
    this.subscribe(Events.StoreOutfit, data => {
      this.storeOutfit(data);
    });

    this.subscribe(Events.UnStoreOutfits, () => {
      this.clearOutfits();
    });
  }
}
