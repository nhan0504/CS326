# Application Data 

##  Overview

### 1. Wardrobe Entry
* **Description:** Stores information about an item the user has in the wardrobe.
* **Attributes:**
  * `item_id` (string): A unique identifier for each item.
  * `user_id` (string): A unique identifier for each user.
  * `image` (image): An image of the item.
  * `name` (string): The name of the item.
  * `cost` (float): The cost of the item.
  * `size` (string): The size of the item.
  * `category` (string): The category of the item (e.g. shirt, pants).
  * `occasion` (string): The occasion of the item (e.g. formal, casual).
  * `season` (string): The season the item is worn (e.g. summer, fall).
  * `brand` (string): The brand of the item.
  * `created_at` (timestamp): The last time the item was updated.
  * `updated_at` (timestamp): The date and time when the item was created.
* **Data source:** User-input data via the add item form.

### 2. User Profile
* **Description:** Contains personal information about the user, including login details and preferences.
* **Attributes:**
  * `user_id` (string): A unique identifier for each user.
  * `name` (string): The user's full name.
  * `profile_pic` (image): The user's profile picture.
  * `email` (string): The user's email address.
  * `password` (string): The hashed version of the user's password.
  * `preferences` (string): The user's style preferences.
  * `created_at` (timestamp): The date and time when the account was created.
  * `udpated_at` (timestamp): The last time the account was updated.
* **Data source:** User-input data when registering or updating their profile.

### 3. Outfit Entry
* **Description:** Contains information about a logged outfit. 
* **Attributes:**
  * `outfit_id` (string): A unique indentifier for each outfit. 
  * `user_id` (string): A unique identifier for each user.
  * `items` (string array): A list of the item_id's of the items in the outfit.
  * `note` (string): A note for the outfit.
  * `created_at` (timestamp): The date and time when the outfit was created.
  * `udpated_at` (timestamp): The last time the outfit was updated.
* **Data source:** User-input data via the daily outfit selector.

### 4. Statistics
* **Description:** Represents clothing data, used for visualizing clothing trends over time.
* **Attributes:**
  * `user_id` (string): A unique identifier for each user.
  * `most_worn` (string): The user's most worn item.
  * `least_worn` (string): The user's least worn item.
  * `cost_per_wear` (JSON): The price divided by the number of times an item has been worn for each of the user's items.
  * `wear_frequency` (JSON): The user's wear frequency by category (e.g. tops, bottoms, shoes)
* **Data source:** System-generated based on wardrobe contents and logged outfits overtime.

### 5. Outfit Planning Entry
* **Description:** Represents an outfit planned to be worn on a specific day in the future.
* **Attributes:**
  * `user_id` (string): A unique indentifier for each user. 
  * `outfit` (Outfit Entry): An outfit entry the user plans on wearing.
  * `date` (date): The date the user plans to wear this outfit.
* **Data source:** User-input data via the calendar view outfit input.

### 6. Recommendations
* **Description:** Outfits that are suggested to wear.
* **Attributes:**
  * `user_id` (string): A unique indentifier for each user. 
  * `outfits` (Outfit Entry array): A list of recommended outfits for the user.
* **Data source:** System-generated based on wardrobe contents and logged outfits overtime.

## Data Relationships
* **User to Wardrobe Entry:** One-to-many relationship (a user can have many wardrobe entries).
* **User to Outfit Entry:** One-to-many relationship (a user can have many outfit entries).
* **User to Outfit Planning Entry:** One-to-many relationship (a user can have many outfit planning entries).
* **Wardrobe Entry to Statistics:** Wardrobe entries contribute to the calculated statistics which are updated in real time.
* **Wardrobe Entry to Recommendations:** Wardrobe entries contribute to the recommendations which are updated in real time.
* **Outfit Entry to Statistics:** Outfit entries contribute to the calculated statistics which are updated in real time.
* **Outfit Entry to Recommendations:** Outfit entries contribute to the recommendations which are updated in real time.
* **Outfit Entry to Outfit Planning Entry:** Outfit entries are a part of outfit planning entries.

## Data Sources
* **User-Input Data:** Most of the data, including user profile, wardrobe items, outfits, and planned outfits will come from direct user input via forms in the application.
* **System-Generated Data:** Statistics and recommendations will be automatically calculated by the system based on wardrobe contents and logged outfits overtime.
