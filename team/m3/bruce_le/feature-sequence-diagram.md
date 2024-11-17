# LogAddItem Feature

The LogAddItem feature allows a user to add items from their wardrobe to their current day's outfit log. On the "Log" page, the user sees a section titled "Today I'm wearing..." with a "+" button to add items. When the user clicks the "+" button, an item selection modal opens, displaying their wardrobe items. The user selects items to add to their outfit. Upon confirmation, the selected items are added to the current outfit, which is saved to IndexedDB via the OutfitRepositoryService. The LogAddItem component publishes an Events.OutfitUpdated event to notify the LogViewComponent to refresh the outfit list. The updated outfit is displayed on the log page.

# LogDeleteItem Feature

The LogDeleteItem feature enables a user to remove an entire outfit from the outfit log. On the "Log" page, each outfit log entry has a delete button (usually labeled "Delete Outfit"). When the user clicks the delete button, the entire outfit is removed from the outfit log. The LogDeleteItem component deletes the outfit from IndexedDB via the OutfitRepositoryService and publishes an Events.OutfitDeleted event to notify the LogViewComponent to remove the outfit from the UI.

# LogAddItem Sequence Diagram

```mermaid
sequenceDiagram
    actor User as User
    participant LogAddItem as LogAddItem Component
    participant WardrobeRepositoryService as Wardrobe Repository Service
    participant OutfitRepositoryService as Outfit Repository Service
    participant IndexedDB as IndexedDB
    participant LogViewComponent as LogViewComponent
    participant Events as Event Bus

    User ->> LogAddItem: Click "+" button
    LogAddItem ->> LogAddItem: Open item selection modal
    User ->> LogAddItem: Select wardrobe items to add
    LogAddItem ->> WardrobeRepositoryService: Fetch wardrobe items
    WardrobeRepositoryService ->> IndexedDB: Get wardrobe items
    IndexedDB -->> WardrobeRepositoryService: Return wardrobe items
    WardrobeRepositoryService -->> LogAddItem: Wardrobe items data
    LogAddItem ->> OutfitRepositoryService: Add items to current outfit
    OutfitRepositoryService ->> IndexedDB: Save updated outfit
    IndexedDB -->> OutfitRepositoryService: Confirm save
    OutfitRepositoryService -->> LogAddItem: Outfit saved
    LogAddItem ->> Events: Publish Events.OutfitUpdated
    LogAddItem ->> LogAddItem: Close item selection modal
    LogAddItem -->> User: Display updated current outfit
    Events ->> LogViewComponent: Events.OutfitUpdated received
    LogViewComponent ->> OutfitRepositoryService: Load updated outfits
    OutfitRepositoryService ->> IndexedDB: Get outfits
    IndexedDB -->> OutfitRepositoryService: Return outfits
    OutfitRepositoryService -->> LogViewComponent: Outfits data
    LogViewComponent ->> LogViewComponent: Refresh outfit list
```

# LogDeleteItem Sequence Diagram

```mermaid
sequenceDiagram
    actor User as User
    participant LogDeleteItem as LogDeleteItem Component
    participant OutfitRepositoryService as Outfit Repository Service
    participant IndexedDB as IndexedDB
    participant LogViewComponent as LogViewComponent
    participant Events as Event Bus

    User ->> LogDeleteItem: Click "Delete Outfit" button
    LogDeleteItem ->> OutfitRepositoryService: Delete outfit by ID
    OutfitRepositoryService ->> IndexedDB: Delete outfit from database
    IndexedDB -->> OutfitRepositoryService: Confirm deletion
    OutfitRepositoryService -->> LogDeleteItem: Outfit deleted
    LogDeleteItem ->> Events: Publish Events.OutfitDeleted (outfitId)
    Events ->> LogViewComponent: Events.OutfitDeleted received
    LogViewComponent ->> LogViewComponent: Remove outfit from UI
    LogDeleteItem -->> User: Outfit deleted confirmation
```


