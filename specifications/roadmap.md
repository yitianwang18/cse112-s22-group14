# Redeem Team - Sprint Roadmap

## Sprint 1 - Status Checks and Small Features

### Status Check of the Repo
- Test Coverage and Quality (Matthew): 
  - Check the current state of the existing unit tests in terms of their coverage and quality (are they testing all of the important aspects of the code?)
  - Add more unit testing if you have time
- Check Code Quality (Evan):
  - Identify code architecture, conventions, problems, etc. within the existing code
  - Focus on Custom Web Components and Events and see if they are implemented properly
- Start E2E Testing (Justin):
  - It does not seem as though the current Cypress tests work because the GitHub Actions Workflow has never succeeded and was disabled
  - Figure out what is wrong with them and approximately how long it would take to fix

### Small Features
- Implement Storing of Tasks in Local Storage (George and Rishmal):
  - Update all instances of interacting with the task list to store and retrieve the tasklist from Local Storage
- Update Instructions (Rishmal):
  - Add explanation that we are hiding buttons during sessions to improve focus
  - Make it automatically popup the first time a user visits the site
- Display Timer in Title (Bill):
  - When a session is running, have the title of the tab be equal to the time remaining
- Tasklist Hotkey (Bill):
  - The hotkey for the tasklist is currently broken. Refer to the code for the other hotkeys to make it work
- UI Improvements (Ivan):
  - Improve design of tasklist
  - Change the second theme to a dark theme
- Fix Safari Notification Problem (Jenny):
  - Identify the issue with notifications on Safari and try to solve it

### DevEx
- Filter GitHub Actions Workflows (Tony):
  - Change Jest workflow to only run when files in the `source` directory are changed
- Linting (Tony):
  - Configure and create a workflow for ESLint

## Sprint 2 - Major Feature Additions

### Major Features
- Timer Customizations (Evan and Bill):
  - Create a menu (similar to the current task list) that gives the user the ability to change the length of a work period, a short break, and a long break
- Change Order of Tasks (Justin and Matthew)
  - Implement drag-and-drop functionality to allow the user to change the order of tasks they have already entered into the tasklist

### Minor Features
- UI Improvements (Ivan):
  - Create new logo and banner image
  - Adjust first theme
  - Fix error messages
- Fix Safari Notifications (Jenny):
  - Create an error message popup for when a Safari user attempts to start a session for the first time
- Display Timer in Title (Bill):
  - When a session is running, have the title of the tab be equal to the time remaining

### DevEx
- E2E Testing for Local Storage Tasklist (George):
  - Add Cypress testing for the feature added last Sprint of storing the tasklist on Local Storage
- JSDocs (George):
  - Set up a GitHub Actions workflow to create and host JSDocs whenever the `main` branch is updated
- Documentation (Tony and Rishmal):
  - Create ADRs for all of the architectural decisions we have made so far
  - Create an image and explanation for our CI/CD pipeline
  - Start documentation for Onboarding and Roadmap

## Sprint 3 - Finish Major Features

### Finish Major Features
- UI for Timer Customizations and Drag-and-Drop (Ivan):
  - We have mostly finished the code for Timer Customizations and Drag-and-Drop to change the order of tasks, but we need to create the UI elements to bind it to
- Bind Timer Customizations Code to UI (Evan and Bill):
  - Once the UI for the Timer Customizations are finished, bind the existing code to the UI elements
  - Fix bugs with Timer Customization code
- Fix Drag-and-Drop Problems on Mobile and Safari (Justin and Matthew):
  - Implement drag-and-drop functionality for mobile
  - Try to address the ghost image problem on Safari

### Minor Features
- Improve Error Messages (Tony):
  - Change the Error Messages to be on click rather than on hover
  - Improve the design of the Error Messages
- Create UI for Safari Notification Popup (Jenny):
  - Create popup similar to the Instructions box to ask the user to enable Safari Notifications

### DevEx
- E2E Testing for Local Storage Tasklist (George):
  - Add Cypress testing for the feature added last Sprint of storing the tasklist on Local Storage
- JSDocs (George):
  - Set up a GitHub Actions workflow to create and host JSDocs whenever the `main` branch is updated
- Clean Up Linting Errors (Rishmal):
  - Address all of the errors and warnings given by ESLint
- Catch Up on Jest Testing (Rishmal): 
  - Try to improve our Jest test coverage

## Sprint 4 - Testing

### Testing
- Improve Testing and Test Coverage Across the Board:
  - Cypress:
    - Drag-and-Drop and `taskList.js` (Justin)
    - Tasklist in Local Storage and `task.js` (George)
    - Settings Menu (Rishmal)
    - Safari Notification and `timerContainer.js` (Jenny)
  - Jest:
    - `taskList.js` (Matthew)
    - `timerContainer.js` (Evan)
    - `task.js` (Bill)
    - `notify.js` (Tony)

### UI
- Improve Drag and Drop UI (Ivan):
  - Make the visuals for the drag-and-drop tasklist look better and more intuitive
- Improve Settings Menu on Mobile (Ivan):
  - The settings menu does not look great on mobile, so we need to improve it
- Adjust UI of Tasklist to Add Space for Mobile Users to Scroll (Ivan):
  - Since we are now tracking `touch` events for drag-and-drop on mobile, we need to give mobile users space to touch the tasklist that will not attempt to change the order of the tasklist so that they can scroll
- Safari Notification Checkbox (Jenny):
  - Add a "Do Not Show Me This Again" checkbox in the Safari notification popup to let the user opt out of the popup

### Minor Features
- Improve Error Messages (Justin):
  - Change the Error Messages to be on click rather than on hover
  - Improve the design of the Error Messages
- Store Users' Preferred Settings in Local Storage (Evan and Bill):
  - Track users' preferred settings in Local Storage
  - On page load, update the appropriate buttons in the settings menu to be "clicked"

## Sprint 5 - Documentation and Final Touches

### DevEx
- Sprint Roadmap Documentation (Rishmal):
  - Create document outlining roadmap of all five sprints
- User and Developer Onboarding (Tony): 
  - Create documents for user onboarding, which is meant to help the user understand the application, and developer onboarding, which is meant to help a peer developer get acclimated to the code base
- C4 Diagram (Justin): 
  - Create a C4 diagram for our code, which highlights the Context, Container, Component, and Code of our project
- JSDocs Hosting (George and Tony):
  - Configure GitHub Pages to host our JSDocs pages
- E2E Testing for Settings (Rishmal):
  - Complete E2E testing for the settings menu
- Unit Testing for Event Handlers for Tasklist (Bill):
  - Add some more unit testing for `taskList.js`, specifically regarding the event handlers there
- Set Up Team Wiki (Rishmal):
  - Set up the GitHub Wiki to have our team introductions

### Minor Features
- Update Instructions Page (Ivan):
  - Add images, hotkeys, and a link to the Pomodoro technique book to the Instructions
- Store Preferred Theme in Local Storage (Jenny):
  - Store and retrieve the user's preferred theme in Local Storage
- Safari Notification Checkbox (Jenny):
  - Add a "Do Not Show Me This Again" checkbox in the Safari notification popup to let the user opt out of the popup
- Reset to Default Settings Button (Evan):
  - Create a button in the Settings menu that will reset the settings to default
- Disable Hotkeys in Menus and Sessions (George):
  - Disable certain hotkeys while a menu is open or a session is active
- Tabbing in Settings (Matthew):
  - Make the tabbing within the settings menu more intuitive