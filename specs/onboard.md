# Teamato

## Final Project Report

### Project Summary

#### A summary statement
In the world, many individuals and groups struggle with structured time management, keeping focus on important tasks, being held accountable for their mistakes, and learning from past experiences. Called PomoHero, our team came up with a web app solution idea that aims to incorporate the Pomodoro Technique to the fullest, automating as much as possible to make it easy for the user, keeping it simple to avoid distracting the user, and providing a tasklist for the user to record their tasks for the day and work uninterrupted on them.

#### The objectives of the project
Our goal is to provide our users with a time-management tool which allows them to focus on their work by using a timer, a tasklist, and an analytics tab to manage and track their work. We expect our project to roll out its next batch of features - which includes the incorporation of an analytics tab and text-to-speech for more accessibility - by the end of Spring 2021. Team leaders, the development team, the design team, and the building team will accomplish this goal by working together in an inclusive and diverse environment, collectively pitching in ideas and working toward a successful product with attention to the process and the experience itself. Accomplishing this goal will result in our users being more productive and our company with a sense of accomplishment.

#### SWOT analysis
We as a company and as a team are proud of delivering our first release with a wonderful UI, app design, user flow, and error-handling. Our strengths lie in the unity between our teams, our mutual cooperation, and our dedication and commitment to what we do. Though we may lack a little in having detailed reviews on Pull Requests and maintaining informative issues, we trust each other and collaborate on bringing the best to our users. There are a lot of companies out there who are also working on Pomodoro Timer apps, using fancy frameworks and awesome libraries, but we guarantee that our focus on less dependencies and fully documented and tested code will pay out at the end.

#### Personnel needs
We are looking for new employees who value process over product, present well documented code which is thoroughly tested, who believe in the Agile Process and its importance, and ultimately, who are ready to hold themselves accountable for their mistakes, retrospect, handle constructive feedback, and grow from the experience.


### Current state of our project

#### What features does the software currently have?
Currently, our software includes an *automated timer* which switches between a work session, a short break, and a long break. If the user gets distracted during a work session, they can reset the timer to start working again. The timer cannot be reset during breaks.

Before starting a session, the user must *input tasks* which they are planning on completing during the session. Tasks can be checked off as and when they are done. Once all tasks have been completed, or if the user has some urgent priority, they can end the session. Uncompleted tasks will be stored for the next session.

The user has access to *instructions* which tell them how to operate the app. The instructions can be reopened during an inactive session using the “i” button.

The app has *two themes* to toggle between - a cool blue “light” theme for users who prefer the light mode and a classic touch, and a forest green “dark” theme for users who prefer the dark mode and a more refined touch.

The software is *fully responsive*, with the text, containers, and banners adjusting and resizing automatically with resizing of the width and height of the screen. Android mobile devices also support our app.

In terms of *accessibility*, we have used contrasting colors for our themes with a *good contrast ratio* to support users with low vision. We have *error indicators* for when the user makes an error and goes against the user flow. Errors are supported with both colors and text. We also have *labels* for input fields for the user to have a better experience navigating the app.

Our app also has *keystroke access* for users who want to access the entire app through the keyboard. We have hotkeys for starting the timer, checking tasks, closing all popups, etc.

Finally, we have both visual and aural *notifications* for alerting the user when a work session or a break ends.

#### Who our audience and end users are
We have created user stories, personas, and use cases for our potential users and you can find them at [Audience](./users/).

#### ADRs
In order to understand why a certain architectural design choice was agreed upon, or why things were done in a particular way rather than doing them in some other way, we have detailed Architectural Design Records (ADRs) which can be accessed at [ADRs](./adrs/).

#### Architecture of the Software
[Architecture](./system) contains finely designed architecture diagrams of the software. They include C4 diagrams - Context views, Container views, and Component views - as well as UML diagrams - Dynamic views.

#### Software Interface and Software Theme
The theme for our software is based on a hero - PomoHero - who helps users effectively manage time and get their work done without any distractions. It has two interface themes - a light and a dark mode. All rough, wireframe, and high fidelity diagrams for the software can be found at [Interface](./interface).

### Project Scope and Schedule

#### Roadmap
As part of our [Project Roadmap](./roadmap.md), we did get done with a majority of the central backlog and most of the features that we had planned for. We are looking for employees who would continue working on the project and implement the remaining features that we had thought of and take the app onward and upward.

#### What is left undone
Features left to be implemented are-
- Analytics - We would love for our users to be able to retrospect on the work they did during a session, get to know how many times they got distracted, and to feel proud of working hard during that session.
- Localization - With more and more users wanting to try our app, we must accommodate those with language barriers, who cannot use the app in English. With most of the text within variables, we want to translate them to whichever language the user prefers.
- Text-to-voice - Our app should not just limit itself to users who can see, but should also be accessible to blind people.
- Voice-control - Given the increasing use of digital assistants like Alexa and Siri, our app would benefit from recognizing user commands and implementing them.

### What tools do we use

#### Communication?
We primarily use 3 different modes of communication:
- Slack  
We have created different channels on Slack which we use to communicate about different ideas and checkups. If we want to discuss a specific issue with a specific teammate, we usually direct message them through Slack.
- Zoom  
Being in a virtual environment, it is important to talk face-to-face, get to know each other, and understand how someone is feeling about an issue or assignment. We do this almost every alternate day via Zoom.
- GitHub  
For most of our technical communications including PR reviews, we use comments on Github

#### Daily standups?
We maintain standup, group, and mentor meeting notes for all of our meetings which are held via Zoom. These notes are available in [Meeting Notes](../admin/meetings/).

#### Where is our software hosted/deployed? 
Our software is hosted on FireBase, with an auto-build of the `dev` branch also on FireBase.

#### Where is our code base?
Our entire codebase - meeting notes, team videos, introductions, source code, tests, documentation, specs (project pitch, interface and architectural diagrams, roadmap, etc.) are privately available on GitHub.

### How to build

#### How does the pipeline work?
A detailed explanation of how the pipeline works, along with a visual flowchart of the execution process is available in the [Team GitHub Wiki](https://github.com/ynshah3/cse110-w21-group30/wiki/General-Workflow).

#### PRs
Pipeline execution is triggered with the creation of a pull request to the `main` branch. Whenever a PR is made, the pipeline runs a GitHub Action on it. This GitHub Action comprises Linting which is done by the Super-Linter and Jest Unit Testing. If any of the above fail, the PR has to be modified. If they pass, a manual review is conducted which must be approved before merging the PR, otherwise the PR has to be modified again. If the PR is approved, it can be merged into the target branch.

#### Issues?
Each feature is broken down into bite-sized issues which can be mostly completed in a day. Issues should have a detailed report, assignees, and tags. Once the issue has been worked on, the corresponding PR is linked to it and the issue is closed.

#### Milestones?
Every sprint is seen as a milestone to which issues are attached. A sprint is typically 2 weeks long. Keeping milestones helps us to track how much we got done during the sprint.

#### Branch organization
We follow a trunk-based system for branches wherein we have our `main` branch which only contains completed, tested, and documented code. We then have a 	`dev` branch which contains the entire code base that is currently being worked on, with all features merged into in order to have a working branch. We finally have small short-lived branches which work on individual issues and are created and merged to `dev` preferably the same day.

#### Auto deploy of `dev` branch
The `dev` branch is automatically built and deployed to FireBase whenever a new PR is merged into it so that there is always something to reference to without locally opening the app.

#### Branch protection
Though we currently have no explicit branch protection rules set up (we do follow the practices; they are just not formally implemented), we would like setting them up on GitHub to prevent unreviewed or untested merges to the `main` branch, preventing force pushing, etc.

### Coding, Testing, and Documentation expectations

#### Jest unit testing
We expect all functions including the use of event handlers to be thoroughly tested via Jest unit testing. These tests are written right after a major function is implemented and coded.

#### Cypress E2E testing
After a feature has been implemented, Cypress end-to-end testing is done in order to verify that the feature behaves as expected when a user would interact with it and allows to find any bugs that may be encountered as part of the user flow.

#### JSDOM Web component testing
In order to rigorously test web components, we prefer using JSDOM.  We feed JSDOM some HTML and it parses it. Then, we can inspect or modify that HTML in-memory using the JS DOM API in order to test for edge cases.

#### Lighthouse performance testing
An important part of software shipping is the release of software which has high performance and accessibility. Before release, it is important to perform Google Lighthouse tests to search for areas which can further be optimized for a better user experience.

#### HTML, CSS, JavaScript Comments 
All of the source code, whether it is HTML, CSS, JavaScript, or Tests should be annotated with comments. Every function and class should have a comment explaining its role, parameter definitions, and what it returns. Code blocks within a function that are not straightforward to understand should also include single-line comments.

#### JSDoc annotations
Comments specifically for JavaScript code should be uniquely formatted in a way that can be interpreted by JSDoc. This is important for JSDoc to automatically go through the source code and generate documentation on [GitHub pages](https://ynshah3.github.io/cse110-w21-group30) for anyone to view.

#### Style guidelines
Style guidelines must be adhered to by the development and design teams. GitHub Super-Linter (eslint + stylelint) checks the style for JavaScript and CSS source code. For a complete list of coding conventions, see [Coding Conventions](./adrs/0010-coding-conventions.md)

#### Minimal use of libraries, dependency issues
We expect code to include as minimal of external libraries as possible. Even when a library is imported, make sure that most of the functions of the library are used and that it is not imported just to fulfill a single requirement. The dependency graph for our software must be sparse and unsophisticated.