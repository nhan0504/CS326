## Contribution Log for Sophia Hubscher

### October 10, 2024
- **Task**: Created Slack workspace and invited members.
- **Details**: Created a Slack workspace, invited everyone in the team, sent out a reminder email, and created channels within the workspace to organize conversation.

### October 13, 2024
- **Task**: Created report file templates for five members of the group.
- **Details**: Created and uploaded five role file templates containing headers and an example entry.
- **Link to Commit**: [Upload report file templates](https://github.com/nhan0504/CS326/commit/70898c33a6d23de04ac99f530e303a7a70f5f920)

### October 13, 2024
- **Task**: Facilitated voting on our semester project.
- **Details**: Created a poll on Slack and reminded group members to vote for the project idea they wanted to do most.

### October 14, 2024
- **Task**: Wrote a first draft of the problem statement.
- **Details**: Wrote a first draft of our project's problem statement based on the [template](https://github.com/umass-cs-326/ms02-example/blob/main/team/m2/problem.md) provided by Prof. Richards.
- **Link to Commit**: [Write first draft of problem statement
](https://github.com/nhan0504/CS326/commit/d154f7491d8b4026fd1e22698833970d91f6eeaa)

### October 14, 2024
- **Task**: Created wireframes.
- **Details**: Used Balsamiq to create low-fidelity wireframes for ClosetIQ's primary screens.

### October 16, 2024
- **Task**: Drafted the ui-diagrams.md document.
- **Details**: Inserted the wireframes made on Balsamiq onto ui-diagrams.md and wrote accompanying text for each image, highlighting features and a use case for each image.
- **Links to Commits**:
  - [Add text to ui-diagrams.md](https://github.com/nhan0504/CS326/commit/aa7b6abb93fdf237de39fb75ad1e6e83692bb92b)
  - [Add wireframes to ui-diagrams.md](https://github.com/nhan0504/CS326/commit/4ec2d74cf83cd750f1c9819d84d1ea8f1bbaf88e)

### October 23, 2024
- **Task**: Created a skeleton website.
- **Details**: Created a new project with a title, logo, and working navigation bar that adjusts depending on screen size.
- **Links to Commit**: [Create skeleton website with nav bar](https://github.com/nhan0504/CS326/commit/0295ac114a2777c89377a2ff4708353edb79c6e6)

### October 24, 2024
- **Task**: Created data models.
- **Details**: Created two new classes (`OutfitEntry` and `WardrobeItem`) that can be used to keep code organized moving forward.
- **Links to Commit**: [Create outfit entry and wardrobe item data models](https://github.com/nhan0504/CS326/commit/6a406fdd527d4da02605a0b384b1116bdcbf309c)

### October 25, 2024
- **Task**: Rearchitected the project.
- **Details**: Used the code provided in lecture on Thursday to transition our code into a component structure where all HTML is written in JavaScript files.
- **Links to Commit**: [Use components for rendering](https://github.com/nhan0504/CS326/commit/55e7093bb87e7caf791348b14ec2857d9b151ef5)

### October 26, 2024
- **Task**: Created the suggestions view.
- **Details**: Created the suggestions view with filtering. The feature uses test data and will need to be migrated to using IndexedDB once setup for that is complete.
- **Links to Commit**: [Create suggestions view](https://github.com/nhan0504/CS326/commit/ba203cc900d4d7dc2a4b075fbfd1decafbbf3102)

### October 28, 2024
- **Task**: Created WardrobeRepositoryService.
- **Details**: Created WardrobeRepositoryService based on Anisha's service file. Included example use code in the PR for team members.
- **Links to Commit**: [Create WardrobeRepositoryService](https://github.com/nhan0504/CS326/commit/bdcdc2c3852c494e83a596f4da80a47f13348a20)

### October 31, 2024
- **Task**: Used IndexedDB to populate the suggestions view.
- **Details**: Used IndexedDB to get all wardrobe items and display them in the suggestions view instead of displaying hard-coded test data. Added a method to the testing folder allowing teammates to run a function to generate mock data for IndexedDB.
- **Links to Commit**: [Suggestions view gets data from IndexedDB](https://github.com/nhan0504/CS326/commit/ad76f76bb9dad736710ead55b307f8e77dcf2d93)

### November 4, 2024
- **Task**: Made outfit suggestions side scroll on small screens
- **Details**: Implemented Hung's suggestion to make images in suggested outfits scroll sideways on small screens instead of wrapping below.
- **Links to Commit**: [Make outfit suggestions side scroll on small screens](https://github.com/nhan0504/CS326/commit/838396c08550d671b59eb71ddf202ef6d5812ed9)

### November 7, 2024
- **Task**: Created sequence diagram for suggestions feature
- **Details**: Created a sequence diagram for suggestions feature using Mermaid
- **Links to Commit**: [Create suggestions sequence diagram](https://github.com/nhan0504/CS326/commit/705905a366560cff98e7b49bed179e3d7b6b4a26)

### November 11, 2024
- **Task**: Added favoriting functionality
- **Details**: Made wardrobe item heart button connect to IndexedDB so items could be favorited and unfavorited
- **Links to Commit**: [Add favorite button functionality](https://github.com/nhan0504/CS326/commit/1d469483ddd33056cad555382a20a53a43850fe2)

### November 15, 2024
- **Task**: Updated the UI diagrams page
- **Details**: Updated the UI diagrams page to reflect the changes from milestone 3
- **Links to Commit**: [Update ui-diagrams.md](https://github.com/nhan0504/CS326/commit/94d3c712b565b23b04d5c126006e4702e5c21747)

### November 30, 2024
- **Task**: Updated outdated tests
- **Details**: Updated old tests that were no longer in line with our data models
- **Links to Commit**: [Update tests (#88)](https://github.com/nhan0504/CS326/commit/6a57f38330622925894fa098bd02d5a2f9871599)

### December 3, 2024
- **Task**: Added Google Authentication
- **Details**: Added Google Authentication to allow users to log in to their own account on our web application
- **Links to Commit**: [Add Google auth to allow users to store data across accounts (#95)](https://github.com/nhan0504/CS326/commit/dc0ca7343cd955c3bc4b6e0bb0c53cac816ebda3)

### December 7, 2024
- **Task**: Added suggestions page data aggregation on back-end
- **Details**: Created a WardrobeController function that generates suggested outfits on the back-end
- **Links to Commit**: [Suggestions page data aggregation #89: Create WardrobeController function that generates suggested outfits](https://github.com/nhan0504/CS326/commit/80fe88a77f46ea8d057690d5c9e0dee03d27fc2d)
