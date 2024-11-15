# Feature description

The Log Page feature in the web application allows users to view, organize, and track outfits they've previously worn and recorded in ClosetIQ. For instance, after creating and wearing a coordinated outfit using items from their ClosetIQ inventory, users can log this outfit along with details like the season, occasion, and any personal notes. These records are then displayed in the user interface, making it simple to browse through past outfits.

Additionally, the Log Page provides search and filtering options, enabling users to quickly find specific outfits or narrow down entries based on criteria such as season, occasion, or other tags. This streamlined functionality allows users to efficiently reference their past looks and draw inspiration for future outfits.

# Sequence Diagram
```mermaid
sequenceDiagram
    actor User as User
    participant LogPageUI as Log Page UI
    participant OutfitRepositoryService as Outfit Repository Service
    participant IndexedDB as IndexedDB

    User ->> LogPageUI: Open log page
    LogPageUI ->> OutfitRepositoryService: Fetch all outfits
    OutfitRepositoryService ->> IndexedDB: Open IndexedDB
    IndexedDB -->> OutfitRepositoryService: Database connection established
    OutfitRepositoryService ->> IndexedDB: Fetch wardrobe items
    IndexedDB -->> OutfitRepositoryService: Return all wardrobe items
    OutfitRepositoryService -->> LogPageUI: Emit Events.LoadOutfitItemsSuccess with log data
    LogPageUI ->> LogPageUI: Display logged outfits
    User ->> LogPageUI: Select filters and click apply filters button
    LogPageUI ->> LogPageUI: Display logged outfits
