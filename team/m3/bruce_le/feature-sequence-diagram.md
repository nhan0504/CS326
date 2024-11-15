# LogAddItem Feature

The LogAddItem feature allows a user to add items from their wardrobe to their current day's outfit log. On the "Log" page, the user sees a section titled "Today I'm wearing..." with a "+" button to add items. When the user clicks the "+" button, an item selection modal opens, displaying their wardrobe items. The user selects items to add to their outfit, and upon confirmation, the selected items are added to the current outfit. The updated outfit is displayed on the log page and saved to IndexedDB via the OutfitRepositoryService.

# LogDeleteItem Feature

The LogDeleteItem feature enables a user to remove items from their current day's outfit log. On the "Log" page, each item in the current outfit has a delete button (usually an "x" or "Delete"). When the user clicks the delete button on an item, that item is removed from the current outfit. The UI updates to reflect the change, and the updated outfit is saved to IndexedDB via the OutfitRepositoryService.

# LogAddItem Sequence Diagram

```mermaid
sequenceDiagram
    actor User as User
    participant LogAddItemUI as Log Add Item UI
    participant WardrobeRepositoryService as Wardrobe Repository Service
    participant OutfitRepositoryService as Outfit Repository Service
    participant IndexedDB as IndexedDB

    User ->> LogAddItemUI: Click "+" button
    LogAddItemUI ->> LogAddItemUI: Open item selection modal
    User ->> LogAddItemUI: Select wardrobe items to add
    LogAddItemUI ->> WardrobeRepositoryService: Fetch selected wardrobe items
    WardrobeRepositoryService ->> IndexedDB: Open IndexedDB
    IndexedDB -->> WardrobeRepositoryService: Database connection established
    WardrobeRepositoryService ->> IndexedDB: Retrieve selected items
    WardrobeRepositoryService -->> LogAddItemUI: Return selected items data
    LogAddItemUI ->> OutfitRepositoryService: Update current outfit with selected items
    OutfitRepositoryService ->> IndexedDB: Open IndexedDB
    IndexedDB -->> OutfitRepositoryService: Database connection established
    OutfitRepositoryService ->> IndexedDB: Save updated outfit data
    OutfitRepositoryService -->> LogAddItemUI: Emit Events.StoreOutfitSuccess
    LogAddItemUI ->> LogAddItemUI: Close item selection modal
    LogAddItemUI -->> LogAddItemUI: Display updated current outfit
```

# LogDeleteItem Sequence Diagram

```mermaid
sequenceDiagram
    actor User as User
    participant LogDeleteItemUI as Log Delete Item UI
    participant OutfitRepositoryService as Outfit Repository Service
    participant IndexedDB as IndexedDB

    User ->> LogDeleteItemUI: Click delete button on an item
    LogDeleteItemUI ->> OutfitRepositoryService: Remove item from current outfit
    OutfitRepositoryService ->> IndexedDB: Open IndexedDB
    IndexedDB -->> OutfitRepositoryService: Database connection established
    OutfitRepositoryService ->> IndexedDB: Update outfit data by removing the item
    OutfitRepositoryService -->> LogDeleteItemUI: Emit Events.StoreOutfitSuccess
    LogDeleteItemUI -->> LogDeleteItemUI: Update UI to remove item
```


