# Dealing with Long Breaks in the end Of a Session

## Context and Problem Statement

Following our approach of a 2 hour cycle and then a long break of 30 min, what if this long break coincides with the end of the session? For instance, if the user has a work session of 2 hours and 30 min, then should the last 30 minutes be a long break? Since the user will not be working after the long break anyway, the break might seem unnecessary.

## Considered Options

* No automated long breaks - Remove the aspect of having a long break after every 2 hours from our approach. Instead, the user can himself/herself determine when a long break is required.
* Reduce a cycle lifetime - If the user's work session duration is such that the long break coincides with the end, instead of putting the long break after 2 hours, give user a long break after 1 or 1.5 hours so that it doesn't coincide with the end anymore.
* Let the user work in the ending 30 min - If the long break coincides with the end, skip the long break and just treat the 30 minutes long break as 25 minutes work and 5 minutes break
* Keep the long break as it is - Don't change anything. But notify the user that his/her ending 30 minutes will be a break so he/she might as well just shorten her work session by 30 minutes.

## Decision Outcome

Chosen option: 'Keep the long break as it is', because

* All the other options compromise on the Pomodoro philosophy in one way or another.
* Removing the automated long breaks gives user too much flexibility which defeats the purpose of our Pomodoro app.
* Reducing the lifetime cycle meddles with the optimal cycle put forward by the Pomodoro philosophy.
* Letting the user work in the ending 30 minutes is not even worth it that much and will unnecessarily alter the Pomodoro cycle. The user will probably be exhausted from his previous 2 hours of work and his focus span will be diminished. Thus working in the ending 30 minutes will be quite unproductive.
* Thus it is best to leave the long breaks as it is to keep consistent with the Pomodoro philosophy as we are not gaining anything too much by meddling with it. 
