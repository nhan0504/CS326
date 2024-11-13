# Feature description
The Suggestions feature displays outfits generated based on a user's preferences. For example, a user may select an outfit featuring only spring and summer items in a formal style. The program will then take this information and display unique outfits matching those criteria. Additionally, users can select options such as "Favorites only" and "Suggest underutilized pieces" to further narrow their results.

# Sequence Diagram
```mermaid
sequenceDiagram
    actor User as User
    participant SuggestionsPageUI as Suggestions Page UI
    participant WardrobeRepositoryService as Wardrobe Repository Service
    participant IndexedDB as IndexedDB

    User ->> SuggestionsPageUI: Open suggestions page
    SuggestionsPageUI ->> WardrobeRepositoryService: Fetch all wardrobe items
    WardrobeRepositoryService ->> IndexedDB: Open IndexedDB
    IndexedDB -->> WardrobeRepositoryService: Database connection established
    WardrobeRepositoryService ->> IndexedDB: Fetch wardrobe items
    IndexedDB -->> WardrobeRepositoryService: Return all wardrobe items
    WardrobeRepositoryService -->> SuggestionsPageUI: Emit Events.LoadWardrobeItemSuccess with wardrobe data
    SuggestionsPageUI ->> SuggestionsPageUI: Generate and display suggested outfits
    User ->> SuggestionsPageUI: Select filters and click apply filters button
    SuggestionsPageUI ->> SuggestionsPageUI: Generate and display suggested outfits