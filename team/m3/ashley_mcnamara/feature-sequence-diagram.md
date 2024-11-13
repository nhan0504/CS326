# Feature description

The add wardrobe item feature is a form that allows a user to enter a new item into their wardrobe. In the form, the user uploads an image, inputs the title, cost, size, and brand, and selects the seasons, occasion, and category. On submission, the form fields are validated and if they are valid a new wardrobe item entry is created. This entry is displayed in the wardrobe page and added to the wardrobe items in indexDB. The form is then closed and reset for the next entry,

# Sequence Diagram

```mermaid
sequenceDiagram
    actor User as User
    participant WardrobeDisplayUI as Wardrobe Display UI
    participant WardrobeAddFormUI as Wardrobe Add Item Form UI
    participant WardrobeRepositoryService as Wardrobe Repository Service
    participant IndexedDB as IndexedDB

    User ->> WardrobeAddFormUI: Open add item form
    User ->> WardrobeAddFormUI: Upload image, input title, cost, size, brand, and select seasons, occasion, and category
    WardrobeAddFormUI ->> WardrobeAddFormUI: Validate form fields
    WardrobeAddFormUI ->> WardrobeAddFormUI: Show error message
    WardrobeAddFormUI ->> WardrobeRepositoryService: Add wardrobe item
    WardrobeRepositoryService ->> IndexedDB: Open IndexedDB
    IndexedDB -->> WardrobeRepositoryService: Database connection established
    WardrobeRepositoryService ->> IndexedDB: Add wardrobe item with form data
    WardrobeRepositoryService -->> WardrobeAddFormUI: Emit Events.StoreWardrobeItemSuccess
    WardrobeAddFormUI -->> WardrobeDisplayUI: Display new wardobe item
    WardrobeAddFormUI -->> WardrobeDisplayUI: Reset and close form
```
