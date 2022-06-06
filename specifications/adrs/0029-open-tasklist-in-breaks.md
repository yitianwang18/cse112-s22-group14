# Do We Want to Allow the User to Open the Task List During Breaks?

## Context and Problem Statement

* We have disabled all menu options while a session is active because we want the user to focus on doing work as much as possible. But, one of our team members brought up the idea of letting the user create new tasks and / or change the order of existing tasks during breaks. 

## Considered Options

* Allow the user to open the task list during breaks: Slightly improves User Experience, but not by that much. Would require a bit of refactoring the way we track state
* Don't allow the user to open the task list during breaks: Slightly worse for UX, but would not require any additional work

## Decision Outcome

We chose to not allow the user to open the task list during breaks because:
  * We do not have much time left in the quarter and we decided to focus on other tasks and other classes over this feature, especially given the UX benefit is not that large