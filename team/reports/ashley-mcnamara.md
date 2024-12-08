## Contribution Log for Ashley McNamara

### October 14, 2024
- **Task**: Revised the problem statement
- **Details**: Went over Sophia's first draft of the problem statement and made some edits and added more details
- **Link to Commit**: [Revised problem.md](https://github.com/nhan0504/CS326/commit/85534ba1dc992358ae6ff457300a44ac80cfbb02)

### October 14, 2024
- **Task**: Added features
- **Details**: Added two new features to features.md
- **Link to Commit**: [Updated features.md](https://github.com/nhan0504/CS326/commit/40f17e71fd9af1e581eec09fe8f057289f5a126b)

### October 16, 2024
- **Task**: Drafted data.md
- **Details**: Wrote the overview for six different data types, the data relationships, and the data sources 
- **Link to Commit**: [Drafted data.md](https://github.com/nhan0504/CS326/commit/1a4b437f153d5906a13a9f49570929917df82956)

### October 24, 2024
- **Task**: Broke up large Clothes Inventory feature into smaller features
- **Details**: Replaced Clothes Inventory feature with 3 new features: Display, Add, Delete 
- **Link to Commit**: [Updated features.md](https://github.com/nhan0504/CS326/commit/877223ced608e7f2be58245c86b359e5d7289b72)

### October 25, 2024
- **Task**: Broke up all features into smaller features
- **Details**: Replaced the rest of the features with smaller point valued features and added team members for each. 
- **Link to Commit**: [Broke down features.md](https://github.com/nhan0504/CS326/pull/4/commits/b190234f69ee45c60caa8d6357937dd0046243eb)

### November 1, 2024
- **Task**: Wardrobe Display
- **Details**: Implemented the grid display for the wardrobe items using test data. Created a new branch called "feature-wardrobe-display" for this task. 
- **Link to Commit**: [Implemented Wardrobe Display](https://github.com/nhan0504/CS326/pull/18/commits/fef740cdedd25b41165e0e4cc9ad45148ef29e03)

### November 2, 2024
- **Task**: Style updates to wardrobe display
- **Details**: Implemented new favorite and delete icon and made the wardrobe items properly resize for different screen sizes. Updated the branch "feature-wardrobe-display"
- **Link to Commit**: [Wardrobe Display Style Updates](https://github.com/nhan0504/CS326/pull/18/commits/dbb04683f7a3de60c8cad895bc1bd8dc93c401a1)

### November 2, 2024
- **Task**: Wardrobe Display Merge Conflicts
- **Details**: Resolved merge conficts for the wardrobe display branch. Then merged and deleted the branch "feature-wardrobe-display"
- **Link to Commit**: [Wardrobe Display Style Updates](https://github.com/nhan0504/CS326/pull/18/commits/48dd76c59a09295f98fd3afef96380e108a19992)

### November 7, 2024
- **Task**: Wardrobe Add Item Form Display
- **Details**: Created a modal that opens with a form to add a new item when pushing the new "+" button in the wardrobe page. Created a new branch called "feature-add-wardrobe-item-form" and merged in and deleted it.
- **Link to Commit**: [Wardrobe Add Item Form](https://github.com/nhan0504/CS326/commit/9b1d5e8e65eb0c8d38826f2aaab28567eb4c21ca#diff-d51acda97ae090fb3170e1a8a4f8642a58b73c2d76e5c840e397c5ecf7c6446e)

### November 10, 2024
- **Task**: Connect Wardobe Add Item Form to IndexDB
- **Details**: Connected the wardrobe add item form to indexdb and made the display update when adding an item. Created and merged a new branch called "add-wardrobe-item-indexdb"
- **Link to Commit**: [IndexDB for Wardrobe Add Item](https://github.com/nhan0504/CS326/commit/57295146a82c7eaa2bb12f1e7ca787ef6898a876)

### November 12, 2024
- **Task**: Add Error Messaging
- **Details**: Added error messaging to the wardrobe add item form if the form is not properly filled out. Created and merged a new branch called "error-messaging-add-wardrobe-item-form"
- **Link to Commit**: [Error Messaging](https://github.com/nhan0504/CS326/pull/43/commits/41e8d14e990a9a9389ac7466dd5ce56a47e343a3)

### November 13, 2024
- **Task**: Sequence Diagram
- **Details**: Created a sequence diagram for adding a new wardrobe item.
- **Link to Commit**: [Sequence Diagram](https://github.com/nhan0504/CS326/pull/48/commits/c84cb7c20635e387f3d3bf5e1f58eee0d60d26f5), [Sequence Diagram Updates](https://github.com/nhan0504/CS326/commit/9e3df597390fdd61f20fef70b78d7ca15a809554)

### November 16, 2024
- **Task**: Fix bugs with deleting wardrobe item
- **Details**: Deleting an item just added no longer deletes everything and the deleted item is properly removed from the displayed array so that it will not reappear if you filter.
- **Link to Commit**: [Wardrobe Delete Bug Fixes](https://github.com/nhan0504/CS326/pull/63/commits/21d059b89a10314b4daada2490926056ee05f910)

### November 17, 2024
- **Task**: Fix bugs with the log page add item
- **Details**: Made the add item listen for wardrobe events and made it properly display the items on refresh.
- **Link to Commit**: [Log bug fixes](https://github.com/nhan0504/CS326/commit/865657d8f84d17a614038f923ad7a76af6ec859a)

### November 21, 2024
- **Task**: Wardrobe Events
- **Details**: Refactored the wardrobe a little bit so that it responds to events. Made suggestions page respond to the event published when a wardrobe item is favorited.
- **Link to Commit**: [Wardrobe Events](https://github.com/nhan0504/CS326/commit/4127ec8f79d77802a4b5a69b2067fbf785af427d)

### December 4, 2024
- **Task**: Fetch Wardrobe Items Backend
- **Details**: Updated the fetch wardrobe items endpoint and created the backend function to get the items
- **Link to Commit**: [Fetch Wardrobe Items Backend](https://github.com/nhan0504/CS326/pull/103/commits/4506a64ec813b3542f6cf07b1b29e26381d8910b)

### December 5, 2024
- **Task**: Suggestions Page Route
- **Details**: Created a new route and controller for the suggestions data.
- **Link to Commit**: [Suggestions Route](https://github.com/nhan0504/CS326/pull/100/commits/6c2b50e04c8e5a6d1789ef0ad1ee052c64e5dfc9)

### December 8, 2024
- **Task**: Fetch Wardrobe Items Frontend Connection
- **Details**: Updated the fetch wardrobe items endpoint to look for a userid and properly fetch the items on the backend, rerendering if a new user is signed in.
- **Link to Commit**: [Fetch Wardrobe Items](https://github.com/nhan0504/CS326/pull/103/commits/2121a179bdee4163e5e421173cf4f799d83e04aa)


