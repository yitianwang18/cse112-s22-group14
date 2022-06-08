# Dealing with Distractions 

## Context and Problem Statement

How should we implement a widget on our app which stops user from getting distracted?

## Considered Options

* Have a button which the user can click to pause the pomodoro timer if he gets distracted
* Have a button which the user can click to stop the pomodoro timer. He must restart the pomodoro manually after stopping it.
* Have a button which the user can click to reset the pomodoro timer. The timer restarts automatically as soon as the button is clicked.

## Decision Outcome

Chosen option: 'Option 3' because,

* Letting the user pause the pomodoro timer will break the pomodoro cycle which we donot want.
* Letting the user stop / start the timer manually lets him stop the timer and remain distracted in other stuff.
* Automatically starting the timer as soon as it is stopped will incentivize the user to get back to work quickly as he can see the timer ticking down. If he/she doesn't start, then he/she will need to reset timer again from the beginning which will elongate the work cycle.
