# Teamato

## Meeting Minutes
## March 02, 2021
<br>

**Opening**:  
The standup meeting of Teamato was called to order at 3:02 PM PST on March 02, 2021 virtually via Zoom by Muhammad Z Khan.

**Meeting Type**:  
Standup

**Members present**:  
Muhammad Z Khan  
Xavier  
James Zhao  
Ivan Robles  
Yash Shah   
Luke  
Haaris Waleh

**Absent**:  
None

## Agenda
Hold Standup Meeting

## New Business
**Code Refactor**:  
Haaris mentioned that Chad recommended avoiding using querySelector to fetch data in other components. We were considering wrapping all of our related components in a larger webcomponent(pomo-timer), and this webcomponent contains instances of every relevant object(task-display, timer-container, task-list), etc. Then, relevant data is passed into each object as properties(e.x. If taskdisplay needs tasklist, the reference is passed into taskdisplay from pomo-timer). This way, almost all instances of ‘querySelector’ or ‘getElementById’ between ‘cousin webcomponents’ should be eliminated. Is this a bad practice?

However, if querySelector is in general bad practice, we have a button in our taskbar that fast-scrolls to the instructions section(queries the instruction section,then teleports to the top of it). Should these also be wrapped in the webcomponent? It would only change document.querySelector to this.querySelector.

These questions were sent to our mentor for clarification.

**Absolute positioning**:  
Currently our toolbar/navbar consists of two buttons: a tasklist button and an information button. Both buttons are currently absolutely positioned and do not take up any space, and space is provided for the toolbar/navbar through a top-margin on our timercontainer webcomponent. James and MZ proposed having a navbar/div that is not absolutely positioned, that takes up space, and then using ‘float’ or flexbox properties to have the objects shift towards the right, similar to how bootstrap implements navbars.

## Stand-up Notes

### Muhammad Z Khan 
**What you had been doing:**  Work on `onStartSession()`  
**What you will do next:** Finish working on it by next meeting  
**Obstacles:** None  

###  James Zhao
**What you had been doing:** Hide buttons and write Cypress Tests  
**What you will do next:** Get app to work on iOS devices  
**Obstacles:** Difficult to do without an Apple desktop

### Ivan Robles
**What you had been doing:** Added gradients to the site  
**What you will do next:** Add second theme with background image  
**Obstacles:** None

### Yash Shah
**What you had been doing:** Wrapped icons within buttons for easy implementation, added disabling color effect to buttons  
**What you will do next:** Help Ivan with the second theme  
**Obstacles:** None  

### Haaris Waleh
**What you had been doing:** Worked on Task Display  
**What you will do next:** Release PR by 7pm  
**Obstacles:** None

### Xavier
**What you had been doing:** Finished testing  
**What you will do next:** Fix button ids and release PR to dev branch  
**Obstacles:** None

### Luke
**What you had been doing:** Set up local linting  
**What you will do next:** Add new scripts for some config files  
**Obstacles:** None

## TODOs
| Tasks to be done | Deadline |
| ---------------- | -------- |
| - | - |

<br>

**Adjournment**:  
Meeting was adjourned at 4:14 PM PST by Muhammad Z Khan.

Minutes submitted by: Yash Shah