# Remembering tasks

## Context and Problem Statements

* We want the app to remember the tasks that users have inputed, so that users don't have to re-entering all the tasks after closing the web app.

## Considered Options

* Don't do it
* LocalStorage
* Backend (firebase)

## Decision Outcomes

We decided to choose LocalStorage because

* We think the benefit of remembering tasks is inline with the concepts of Pomodoro timer. It eases users from doing repetitive non-productive tasks.
* LocalStorage provided enough benefit: It allows users to close the browser/computer. Go do something else, and then come back to work so the same tasks in the pomodoro session.
* LocalStorage is easy to implement. On the other hand, adding backend introduces more complexity.
* Most of the team members are not familiar with backend services, based on the time constraint, it is unlikely to do backend properly.
* Backend allows persistant storage across multiple devices. While this is a nice thing to have, it is not a use case that every user will encounter, since most users will use a single device as their workstation.
