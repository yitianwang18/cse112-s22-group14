# Where will we be hosting our PomoHero Web App

## Context and Problem Statement

What amount of accessibility to the tasklist should we provide to the user during a Pomodoro session?

## Considered Options

* Always Viewable & Editable - User can always view and edit the tasklist in session 
* Always Viewable & Editable only during breaks - User can always view the tasklist in session but can only edit during short/long breaks
* Viewable & Editable only during breaks - User can only view and edit during short/long breaks
* Viewable only during breaks & not Editable at all -  User can only view during short/long breaks but can not edit during a session
* not Viewable at all & not Editable at all - User can neither view nor edit during a session

## Decision Outcome

Chosen option: 'not Viewable at all & not Editable at all', because

* The 'Always Viewable & Editable', 'Always Viewable & Editable only during breaks' and 'Viewable & Editable only during breaks' option gives users too much control to manually change tasklist, espacially the first option which lets user to alter tasklist even during work cycles. This goes against our aim of keeping our product as automated as possible. We don't want users to alter their work- break session cycle in any way once the session starts.
* The 'Viewable only during breaks & not Editable at all' option solves our automation concern, but during breaks, we want the users to stop worrying about their tasks completely and fully utilize their breaks to de-stress. That's why we don't even want users to be able to view their tasks even during breaks.
* The 'not Viewable at all & not Editable at all' fixes both our automation concern and the utilization of breaks concern. But that means that users cannot view there tasks at all during sessions which is unfeasible as they might forget what they have to do next. To fix that, we will add a new display feature which only shows the Current task and the Next task during session. 
