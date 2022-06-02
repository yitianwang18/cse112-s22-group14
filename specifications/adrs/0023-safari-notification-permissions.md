# Deciding How to Handle Displaying the Safari Notification Reminder

## Context and Problem Statement

* The way our current implementation of our Safari Notification Permission Pop-Up works is that it will appear the first time a user attempts to start a session on Safari without giving our site Notification Sound Permissions. The problem with this is that the user may forget if it has been a long time since they were reminded of this

## Considered Options

* First Time Only - This would basically keep the implementation as is
* First Time Only and After One Month - Very similar to the way our instruction pop-up works
* Every Time - This would get rid of the problem of the user forgetting, but it would likely get annoying very quickly
* Add "Do Not Show Me This Again" Checkbox - This is the best for UX but it would require a lot more work

## Decision Outcomes

We chose to add the "Do Not Show Me This Again" checkbox because: 
    * One of our main values for this project is creating a user-focused project, which involves prioritizing UX over DX
    * It shouldn't too difficult, and we are not planning on creating any new features, so we have the time