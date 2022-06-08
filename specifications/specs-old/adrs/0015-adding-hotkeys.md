# Adding Hotkeys to our App

## Context and Problem Statement

Should we add hotkeys to our Pomodoro Timer to let user navigate our app without a mouse?

## Considered Options

* No - The extra developement required for this feature is not justified by the limited amount of computer users with no mouse access. It might also get confusing if user unintentionally presses a hotkey.  
* Yes - Makes our product more accessible. Lots of users prefer to not take their hands off the keyboard when working even if they have a mouse. Having hotkeys will facilitate that. 

## Decision Outcome

Chosen option: 'Yes', because

* Keeping hands on the keyboard as much as possible is a very common practice and having hotkeys will let the users continue with this practice.
* Improves accessibility in improbable, but definitely possible, circumstances where user cannot access a mouse.
* To minimize confusion, we will let the users know about all our hotkeys and the consequences of pressing them beforehand in our instructions modal. 
