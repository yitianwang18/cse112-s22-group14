# Developer Onboarding

## Project Overview

### Objective 

Our goal is to create a user-oriented application that is reliable, maintainable, and accessible.

### Values

Our top priority was to make an application that would improve a user's focus so that they could be more productive. We repeatedly referred to this value when making decisions regarding our application.

If you want to learn more about how we made our decisions, please take a look at our [ADRs](adrs/).

### Audience

We are currently targeting students who want to increase their productivity.

## Understanding the Codebase

### Overview
Our codebase uses vanilla JavaScript to create a cohesive application for users to improve their productivity. Each aspect of our website has a  custom HTML element, and its formatting is setup in the corresponding constructor of the JavaScript class. All actions that can be triggered on our app are handled by our Event Bus, which creates custom events, fires them when appropriate, and binds handlers to them to specify the behavior when they are fired.

If you want to understand the specific parts of our codebase at a high level, please take a look at our [C4 Model](C4-model/).

### Style Convention

We defined a common style convention that we used throughout our codebase

* Variables should have meaningful names.
* Variable names should not be less then 3 letters.
* 4 spaces must be used for indentation.
* A line code should not exceed 100 characters. 
* Global variables i.e. variables starting with ```var``` must not be used.
* Snake-case must be used when naming variables.
* Camel-case must be used when naming functions.
* The first letter should represent what datatype the variable is. For instance, if the variable contains a number, it should be named ```n_varname```. The following convention must be used:
  * ```n_``` for numbers
  * ```b_``` for booleans
  * ```s_``` for strings
  * ```o_``` for objects
  * ```a_``` for arrays
  * ```f_``` for functions
  * ```p_``` for promises
* For commenting, code-blocking should be used as much as possible.

### Commenting (with JSDocs)

We use JSDocs to automatically generate code level documentations.
Comments specifically for JavaScript code should be uniquely formatted in a way that can be interpreted by JSDoc.

Our JSDocs are hosted [here](https://yitianwang18.github.io/cse112-s22-group14/).

## Project Workflow and CI/CD Pipeline

The workflow we defined for our project is to have a protected `main` branch that is deployed and a protected `dev` branch that serves as an intermediary, staging branch for testing before code goes to `main`. Changes to `main` and `dev` must be made and tested on a separate branch. Then, a Pull Request must be made to merge the branch into `dev`, and a team lead will review the changes and approve if they are appropriate. `dev` is the only branch that is allowed to merge into `main`.

We enforced code reliability through automated Jest unit testing via GitHub Actions and manual Cypress End-to-End Testing.  

We enforced through automated ESLint checks via GitHub Actions.

If you want to know more about our workflow, please take a look at our [CI/CD Pipeline](pipeline/).

## State of the Project

### Inherited State

We inherited this project after a group started to work on it in a previous Software Engineering course. 

If you want to see the state of the project after they were finished, please take a look a their [App](https://pomo-hero.web.app/), [GitHub Repository](https://github.com/ynshah3/cse110-w21-group30), or [Documents](specs-old/).

### Our Work

We wanted to get this project up to 1.0 standards by focusing on user experience, accessibility, and testing. Initially, we wanted to clean up some of the issues that existed in the previous project. Afterwards, we added some features that we thought would be beneficial for user experience. 

If you want to learn more about our progress, please take a look at our [Roadmap](roadmap.md) or our [Project Backlog](https://github.com/yitianwang18/cse112-s22-group14/projects/1).

### Future Plans

Although we got a lot done and we are very happy with the state of our app, there are still a lot of things that could be added.

Here are some improvements we did not get a chance to make:
  - Language Options - In order to improve accessibilty, we wanted to add different language options. This would require refactoring all strings read from different arrays depending on the current language.
  - Tutorial - Someone who is not that tech-saavy might initially struggle to understand what to do on our website. We created the Welcome popup in order to help explain what to do, but we recognize that it is not a full solution. A tutorial would really help explain how to use the website.
  - Sign In Page - Many members of our team were very keen on the idea of making a sign in page to allow users to have their preferences and tasks linked to their profile on a database that would allow them to keep their data on multiple devices
