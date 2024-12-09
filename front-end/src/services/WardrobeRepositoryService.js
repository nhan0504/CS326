import { Events } from "../eventhub/Events.js";
import Service from "./Service.js";

const base_url = "http://localhost:4000/v1/"

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

  async getMostWornItems(user_id) {
    try {
      const url = `${base_url}stats/${user_id}/most-worn`;

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      // check if the response is ok
      if (!response.ok) {
        throw new Error("Bad network response.");
      }

      // Parse the items as JSON
      const data = await response.json();
      const items = data.items;

      return items;
    } catch (e) {
      console.error(e);
      throw new Error("Error fetching wardrobe items.");
    }
  }

  async getLeastWornItems(user_id) {
    try {
      const url = `${base_url}stats/${user_id}/least-worn`;

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      // check if the response is ok
      if (!response.ok) {
        throw new Error("Bad network response.");
      }

      // Parse the items as JSON
      const data = await response.json();
      const items = data.items;

      return items;
    } catch (e) {
      console.error(e);
      throw new Error("Error fetching wardrobe items.");
    }
  }

  async getCostPerWear(user_id) {
    try {
      const url = `${base_url}stats/${user_id}/cost-per-wear`;

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      // check if the response is ok
      if (!response.ok) {
        throw new Error("Bad network response.");
      }

      // Parse the items as JSON
      const data = await response.json();
      const items = data.items;

      return items;
    } catch (e) {
      console.error(e);
      throw new Error("Error fetching wardrobe items.");
    }
  }

  async getFrequencyPerCategory(user_id) {
    try {
      const url = `${base_url}stats/${user_id}/category-frequency`;

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      // check if the response is ok
      if (!response.ok) {
        throw new Error("Bad network response.");
      }

      // Parse the items as JSON
      const data = await response.json();
      const items = data.items;

      return items;
    } catch (e) {
      console.error(e);
      throw new Error("Error fetching wardrobe items.");
    }
  }

  async getItemsPerCategory(user_id) {
    try {
      const url = `${base_url}stats/${user_id}/items-per-category`;

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      // check if the response is ok
      if (!response.ok) {
        throw new Error("Bad network response.");
      }

      // Parse the items as JSON
      const data = await response.json();
      const items = data.items;

      return items;
    } catch (e) {
      console.error(e);
      throw new Error("Error fetching wardrobe items.");
    }
  }

  addSubscriptions() {
    this.subscribe(Events.StoreWardrobeItem, (data) => {
      this.storeWardrobeItem(data);
    });

    this.subscribe(Events.UnStoreWardrobeItem, () => {
      this.clearWardrobeItems();
    });
  }
}
