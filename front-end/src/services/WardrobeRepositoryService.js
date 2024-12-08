import { Events } from "../eventhub/Events.js";
import Service from "./Service.js";

export class WardrobeRepositoryService extends Service {
  constructor() {
    super();
    this.dbName = "wardrobeDB";
    this.storeName = "wardrobeItem";
    this.db = null;

    // Initialize the database
    this.initDB()
      .then(() => {
        this.loadWardrobeItemsFromDB(); // Load wardrobe items on initialization
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore(this.storeName, {
          keyPath: "item_id",
        });
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        reject("Error initializing IndexedDB");
      };
    });
  }

  async storeWardrobeItem(wardrobeItemData) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.add(wardrobeItemData);

      request.onsuccess = () => {
        document.dispatchEvent(new Event(Events.StoreWardrobeItemSuccess));
        resolve("Wardrobe item stored successfully");
      };

      request.onerror = () => {
        document.dispatchEvent(new Event(Events.StoreWardrobeItemFailure));
        reject("Error storing wardrobe item:");
      };
    });
  }

  async clearWardrobeItem(wardrobeItemId) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(wardrobeItemId);

      request.onsuccess = () => {
        document.dispatchEvent(new Event(Events.UnStoreWardrobeItemSuccess));
        resolve("Wardrobe item cleared successfully");
      };

      request.onerror = () => {
        document.dispatchEvent(new Event(Events.UnStoreWardrobeItemFailure));
        reject("Error clearing wardrobe item:");
      };
    });
  }

  async loadWardrobeItemsFromDB() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = (event) => {
        const wardrobeItems = event.target.result;
        wardrobeItems.forEach((item) =>
          this.publish(Events.NewWardrobeItem, item)
        );
        resolve(wardrobeItems);
      };

      request.onerror = () => {
        this.publish(Events.LoadWardrobeItemFailure);
        reject("Error retrieving wardrobe items");
      };
    });
  }

  async clearWardrobeItems() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => {
        document.dispatchEvent(new Event(Events.UnStoreWardrobeItemSuccess));
        resolve("All wardrobe items cleared");
      };

      request.onerror = () => {
        document.dispatchEvent(new Event(Events.UnStoreWardrobeItemFailure));
        reject("Error clearing wardrobe items");
      };
    });
  }

  async toggleFavorite(itemId) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.get(itemId);

      request.onsuccess = (event) => {
        const item = event.target.result;

        if (item) {
          item.is_favorite = !item.is_favorite;

          const updateRequest = store.put(item);

          updateRequest.onsuccess = () => {
            document.dispatchEvent(new Event(Events.UpdateWardrobeItemSuccess));
            resolve("Wardrobe item updated successfully");
          };

          updateRequest.onerror = () => {
            this.publish(Events.UpdateWardrobeItemFailure, item);
            reject("Error updating wardrobe item");
          };
        } else {
          reject("Wardrobe item not found");
        }
      };

      request.onerror = () => {
        reject("Error retrieving wardrobe item");
      };
    });
  }

  addSubscriptions() {
    this.subscribe(Events.StoreWardrobeItem, (data) => {
      this.storeWardrobeItem(data);
    });

    this.subscribe(Events.UnStoreWardrobeItem, () => {
      this.clearWardrobeItems();
    });
  }

  async deleteWardrobeItem(itemId) {
    try {
      await this.model.delete({ item_id: itemId }); //Adjust according to WardrobeItem's delete method
      this.publish(Events.UnStoreWardrobeItemSuccess, itemId); //Notify that the item has been deleted
    } catch (error) {
      console.error('Error deleting wardrobe item:', error);
      throw error; 
    }
  }

}
