# Logging Tasks

## Context and Problem Statement

When using our Pomodoro App, how should we log user's completed tasks?

## Considered Options

* Log multiple tasks to a single pomodoro - Log in which pomodoro of the workday the specific task was completed.
* Log multiple pomodoros to a single task - Log how many pomodoros a single task took. 
* Round the number of pomodoros/tasks - Round the entity to be mapped (task in opt 1 & pomodoro in opt 2). 

## Decision Outcome

Chosen option: 'Log multiple pomodoros to a single task' and 'Round the number of pomodoros', because

* More often than not, a user will divide his whole workday into tasks that should take more then 25 minutes. Thus logging multiple tasks to a single pomodoro 
is unfeasible.    
* For the same reason as above, logging multiple pomodoros to a single task will be a more feasible option.
* Rounding the number of pomodoros to be logged may introduce some inaccuracy in logging but it will make our code much simpler. So atleast for the MVP, 
the option of rounding off the logged pomodoros was chosen.
