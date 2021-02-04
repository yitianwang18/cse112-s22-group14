# What makes up a WorkDay?

## Context and Problem Statement

In our Pomodoro App, how do we define a workday?

## Considered Options

* Group by Session - The user can decide the number of sessions he must work for before he can end his workday.
* Group by Task - The user can list all the tasks he must do before he can call it a day. 
* Group by Time - The user can allocate the number of hours he must work before he can call it a day.

## Decision Outcome

Chosen option: 'Group by Task', because

* The 'Group by Session' option is too ambiguous to be used as a measure for a workday e.g. Should two consecutive sessions be considered as a single sessions? etc. Moreover, it is really uncommon that someone measures his/her daily productivity by how many sessions he/she put in.   
* The 'Group by Time' option doesn't incentivizes the user to be productive in his/her day. Rather it might lead the user to kill hours so that they can call it a day. 
* The 'Group by Tasks' allows te uset to focus more on the tasks to be achieved rather than the time spent to do those tasks. This incentivizes the user to be productive during the day so that he/she is able to get done with more stuff during the day. Also, if the user achieves all the daily tasks, this option rewards user for increased productivity by allowing him to end his/her day early.
