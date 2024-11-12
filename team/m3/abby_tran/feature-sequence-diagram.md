# Feature description
The Statistics on Clothing Worn feature provides users with a visual dashboard to gain insights into their wardrobe usage patterns. This feature displays various metrics and charts based on clothing usage data stored in the app. Key functionalities include:
- Most-Worn Items: Shows the top 5 items in the wardrobe that are worn most frequently.
- Least-Worn or Never-Worn Items: Highlights items that have been rarely or never used.
- Cost-Per-Wear: Calculates the cost effectiveness of each item by dividing the item’s purchase cost by the number of times it has been worn.
- Wear Frequency by Category: Summarizes usage frequency across categories (e.g., tops, bottoms, shoes).
- Download Option: Allows users to download an image of their wardrobe statistics so they can share with others

# Sequence Diagram
``` mermaid
sequenceDiagram
    participant User as User
    participant UI as Stats Page UI
    participant Service as WardrobeRepositoryService
    participant DB as IndexedDB

    %% User loads the statistics page
    User->>+UI: Open Statistics Page
    UI->>+Service: Initialize and load wardrobe items
    Service->>+DB: Open IndexedDB (wardrobeDB)
    DB-->>-Service: Database connection established

    %% Loading wardrobe items
    Service->>+DB: Fetch wardrobe items (loadWardrobeItemsFromDB)
    DB-->>-Service: Return all wardrobe items
    Service-->>UI: Emit Events.LoadWardrobeItemSuccess with wardrobe data

    %% Display statistics charts
    UI->>UI: Calculate and display "Most worn items"
    UI->>UI: Calculate and display "Least worn items"
    UI->>UI: Calculate and display "Cost-per-wear"
    UI->>UI: Calculate and display "Wear frequency by category"
    UI->UI: Render charts and statistics

    %% User interacts with the download feature
    User->>+UI: Click "Download charts" button
    UI->>UI: Convert the HTML component into an image
    UI->>User: Download the image with stats
