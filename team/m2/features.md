# Application Features

## Feature Name: Clothes Inventory Display
**Description:** A grid display on the Wardrobe page of all Wardrobe item elements that are stored in IndexedDB. Should display a filtered set of the items based on the search and filter. For each item, we should display the uploaded image and the attributes of the item.

**Point Value:** 3

**Team Member:** Ashley McNamara

## Feature Name: Clothes Inventory Add Form
**Description:** A form that allows users to enter a new item into their wardrobe. In the form, the user uploads an image and enters details such as name, cost, size, category, etc. There is also form validation. This creates a new wardrobe entry that is saved in IndexedDB, and the form resets for the next entry.

**Point Value:** 3

**Team Member:** Ashley McNamara

## Feature Name: Clothes Inventory Delete Item
**Description:** A button that the user can press on a wardrobe item to delete that item from their wardrobe. When the button is pressed, the item should be deleted from IndexedDB and the wardrobe display should update and no longer include that item.

**Point Value:** 1

**Team Member:** Liam Gates

## Feature Name: Log Outfit Display
**Description:** A grid display in the "Log" page of the user's past outfits based on the outfits stored in IndexedDB. Should display a filtered set of outfits based on the search and filter. For each outfit, we should display the date it was worn, and the wardrobe items that are a part of it.

**Point Value:** 3

**Team Member:** Hung Nguyen

## Feature Name: Log Outfit Add Item
**Description:** A section at the top of the "Log" page with the title "Today I'm wearing..." with a display of the current items that are a part of this outfit and a "+" button to add an item. When pushing the "+" button, a window should open to select a wardrobe item to add. The outfit should be saved in IndexedDB.

**Point Value:** 2

**Team Member:** Bruce Le

## Feature Name: Log Outfit Delete Item
**Description:** An 'x' button on each item that is a part of the user's current logged outfit that the user can press to remove that item from their current logged outfit. The item should be deleted from that outfit in IndexedDB and the display should update and no longer include that item.

**Point Value:** 1

**Team Member:** Bruce Le

## Feature Name: Statistics On Clothing Worn
**Description:** The statistics dashboard will provide users with visual insights into their wardrobe usage. It will display metrics such as:
- Most-worn clothing items
- Least-worn or never-worn items
- Cost-per-wear for each item (calculated by dividing the price by the number of times it has been worn)
- Wear frequency by category (e.g., tops, bottoms, shoes)
- Share option to share the stat with others
  
Users can also set personal goals, such as reducing the cost-per-wear of certain items or redistributing the use of their wardrobe more evenly. The dashboard can suggest decluttering or donating rarely worn items to encourage more mindful consumption. Users can also download the graphs.

**Point Value:** 4

**Team Member:** Abby Tran

## Feature Name: Logged Outfit Search and Filter
**Description:** A search bar and filtering bar on the "Log" page where a user can search by a keyword found in any attribute and filter based on conditions such as date, note, color, type, category, etc. This should get the logged outfits stored in IndexedDB and filter them in order to be displayed.

**Point Value:** 3

**Team Member:** Anisha Prathi

## Feature Name: Wardobe Search and Filter
**Description:** A search bar and filtering bar on the "Wardrobe" page where a user can search by a keyword found in any attribute and filter based on conditions such as size, color, type, category, etc. This should get the wardrobe items stored in IndexedDB and filter them in order to be displayed.

**Point Value:** 3

**Team Member:** Liam Gates

## Feature Name: Outfit Recommendation
**Description:** This feature uses data from the user’s past outfit logs and wardrobe inventory to suggest new outfits. It will take into account the user's favorite combinations and the clothing items that have not been worn recently. The system could also use filters like weather, season, or occasion to refine outfit suggestions. 

**Point Value:** 4

**Team Member:** Sophia Hubscher
  
# Milestone 4
## Feature Name: Stats page data aggregation 
**Description:** This feature will implement endpoint that fetch data from the database and perform some data aggregation and calculation so that the stats page can display it

**Point Value:** 6

**Team Member:** Abby Tran

## Feature Name: Suggestions page data aggregation
**Description:** This feature will take the wardrobe items used in suggestions and create suggested outfits with them. Users can indicate if they would like to prioritize underutilized pieces and using that information, this back-end method will return a list of suggested outfits.

**Point Value:** 5

**Team Member:** Sophia Hubscher

## Feature Name: Store Outfit
**Description:** This feature will implement a POST request to the database to store a new outfit item. This includes storing multiple images for multiple wardrobe items. This will connect to the add outfit form and then will publish an event that is listened for by every other page.

**Point Value:** 5

**Team Member:** Hung Nguyen

## Feature Name: Add Wardrobe Items
**Description:** This feature will implement a POST request to the database to store a new wardrobe item. This includes storing an image. This will connect to the add wardrobe item form and then will publish an event that is listened for by every other page.

**Point Value:** 5

**Team Member:** Abby Tran


## Feature Name: Fetch Wardrobe Items
**Description:** This feature will implement a GET request for wardrobe items from the database and display the items in the wardrobe page as well as the log page add item form. This will involve fetching images.

**Point Value:** 5

**Team Member:** Ashley McNamara

## Feature Name: User Authentication with Google Auth
**Description:** This feature will implement secure user authentication using Google authentication. When users are logged in, the login button at the top of the screen will update, and they will be able to view their own wardrobe items, outfits, statistics, and suggestions. When users are not logged in, they will not be able to use wardrobe or outfit functionality and will be prompted to log in.

**Point Value:** 5

**Team Member:** Sophia Hubscher

## Feature Name: Implement SQLite
**Description:** Set up SQLite for the web application

**Point Value:** 6

**Team Member:** Anisha Prathi

## Feature Name: Log Page Filter Bar
**Description:** The user will be able to filter the outfits on the Log page using different properties of the outfit, such as the occasion of the outfit. This will allow the user to organize and select their outfits using different properties of the outfit. This feature will be integrated in the Log page view component, while connected to IndexedDB and SQLite. It must be able to get the filtered data from the database along with updating the UI components.

**Point Value:** 5

**Team Member:** Liam Gates

## Feature Name: Suggestions page filter bar
**Description:** This feature will implement suggestions page filter bar and the wardrobe at the backend to fetch the data. This will then connect to the front-end of the suggestions page to display the new results that are constructed.

**Point Value:** 5

**Team Member:** Hung Nguyen

## Feature Name: Suggestions Page Routes and Endpoints
**Description:** This feature will implement the routes and endpoints for the suggestions page to fetch the data. This will then connect to the front-end of the suggestions page to properly display the new results that are now being constructed on the backend.

**Point Value:** 5

**Team Member:** Ashley McNamara

## Feature Name: Update Wardrobe Item
**Description:** The user will be able to update the settings of their wardrobe item, such as the favorite setting of the item. This will allow the user to keep their digital wardrobe up to date with respect to their physical wardrobe. This feature will be integrated in the wardrobe view component, while connected to IndexedDB and SQLite. It must be able to update the database with the updated item along with updating the UI.

**Point Value:** 5

**Team Member:** Liam Gates

## Feature Name: Delete wardrobe items
**Description:** When users click the delete button on an individual wardrobe item, that wardrobe item currently stored in SQLite will be removed from the database and this deletion will be reflected in the front-end.

**Point Value:** 5

**Team Member:** Bruce Le

## Feature Name: Fetch Outfits
**Description:** Fetch outfits currently stored in SQLite and display in log page

**Point Value:** 5

**Team Member:** Anisha Prathi