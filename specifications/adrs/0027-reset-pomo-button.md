# Do We Want to Have a Reset Pomo Button?

## Context and Problem Statement

* The project we inherited had a feature where the "Start Pomo" button would turn into a "Reset Pomo" button when a session was active. This was meant to allow the user to restart a work session if they felt that they were not focused enough. Until now, we have not considered it problematic, so we have left it as is. However, recently Professor Powell suggested that if we wanted to be consistent with the original Pomodoro technique, as we are with the Settings menu, we should not allow the user to reset a pomo.

## Considered Options

* Remove Reset Pomo Button: We could get rid of this button because it is inconsistent with our idea of staying fairly true to the original Pomodoro technique. In this case, we would get rid of the two button set up and have one button that shifts between "Start Pomo" and "End Session" depending on if a session is active or not.
* Keep Reset Pomo Button: Keeping the button could arguably improve UX by giving the user a bit more flexibility and the ability to be honest with themselves about their focus level. But, this would reduce how consistent we are across the website because we are limiting customization options in Settings to stay true to the original Pomodoro technique, but here we are not staying true to the original.

## Decision Outcome

We chose to remove the Reset Pomo Button because:
  * We did not think the potential UX benefits outweighed the inconsistent philosophy this feature would cause
  * Only having one button simplifies the app