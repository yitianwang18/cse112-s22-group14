# Flexibility in Workday Scheduling

## Context and Problem Statement

When using our Pomodoro App, how much flexibility should the user be given around scheduling his workday?

## Considered Options

* No Flexibility - The user must strictly abide by a 2 hour cycle of 4 iterations of 25 min work, 5 min break, and after 2 hours of this cycle, he must take a 
30 min break before following the 2 hour cycle again. The user must do this for the whole workday i.e. the user cannot have a break longer then 30 min during the 
entirity of the day.
* Somewhat Flexibility - The user is allowed to divide his workday into multiple sessions. He can take as long of a break as necessary between two sessions. But 
once in a session, the user must strictly abide by a cycle of of 25 min work, 5 min break. If the session is longer than 2 hours, the user must take a 30 
min break after every 2 hours before following the cycle again for that particular session.
* Total Flexibility - The user is allowed to divide his workday into multiple sessions. Furthermore, once in a session, the user is allowed to alter the amount of 
work-time and break-time as per his needs.

## Decision Outcome

Chosen option: 'Somewhat Flexibility', because

* The 'No Flexibility' is too strict to be followed in a real-world day. In the real-world, things are bound to come up which will take longer than 30 min i.e. Sudden 
meeting with your boss, picking kids/siblings from school/work, other household chores etc. Thus restricting the user to having a maximum break of 30 min will make 
it impossible for him/her to follow the Pomodoro timer.   
* The 'Total Flexibility' is too leniant to actually help the user follow the Pomodoro philosophy, which kills the purpose of our app. The Pomodoro philosophy is primarily
based on the 25 min work, 5 min break cycle. If the user can change these durations, then our app is not a Pomodoro timer but rather just another generic timer.
* The 'Somewhat Flexibility' allows the user to flexibly pick the times of the day in which he will like to be completely focused and productive. This allows him/her 
work around his/her other commitments for the day, while keeping him/her completely focused and productive for the timeslot that she is free to work.


