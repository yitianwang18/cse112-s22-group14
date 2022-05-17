# Choosing Project to Start With

## Context and Problem Statement

For this class, we will be choosing a project that one of our team members worked on in CSE 110 and improving it to become production ready. We valued Functionality, Relaiablity, Maintainability, and Usability when making our decision.

## Considered Options

* We immediately ruled out all three Android apps because Android is a difficult language to work with and only a few people had experience with it
* Ruled out Tony's Chrome Extension because it used ReactJS, which is a framework that most people had little to no experience with
* Decided against Bill's Pomodoro Timer, Jenny's Bullet Journal, and Evan's Bullet Journal because the projects were overall weaker than the other two options, especially when it came to their UI, which seemed like the most difficult thing to fix.
* Last Two Choices:
  * Ivan's Pomodoro Timer:
    * Minimal features, but they all work very well
    * Mostly intuitive design
    * Hotkeys are good
    * Good Docs with roadmaps and good testing
    * Some problems that are generally quick fixes: annoying error messages, second theme is bad
  * Matthew's Pomodoro Timer:
    * Good UI, especially with the horseshoe timer to visuall show the timer
    * Well-organized modular code
    * Great, clean docs with JSDocs
    * Lots of testing, good pipeline diagram
    * Minor problem with bounds checking in timer customization
    * Major problem: No mobile support whatsoever
  
## Decision Outcome

Chosen option: 'Ivan's Pomodoro Timer' because

* The main factor was that Matthew's has no mobile support, which is always annoying to try to figure out. Especially given the layout of the project, it would require a lot of refactoring to do properly, which would push back additional features and DX improvements that we would want to do
* Ivan's project is just really, really clean. There are very few things that we need to fix, mostly just additions
