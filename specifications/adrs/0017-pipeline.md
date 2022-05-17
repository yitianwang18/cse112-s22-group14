# Finalizing our Workflow and CI/CD Pipeline

## Context and Problem Statement

We want to finalize our workflow and CI/CD pipeline so that everyone knows what they are doing when we start coding.

## Considered Options

* Adopt the workflow of the previous group: branch off of intermediary branch `dev`. Merge everything to `dev`, once `dev` is settled, merge to `main` and deploy. GitHub Actions will run on PRs to `dev` and `main`.
* New workflow: branch off of `main`. When everything works on your branch, merge to `main`. Whenever `main` is updated, merge `main` into all working branches to stay up to date. GitHub Actions runs on PRs to `main`

## Decision Outcome

Chosen option: 'Adopt workflow of previous group' because

* We liked the idea of having an intermediary branch to keep `main` clean
* People are very likely to forget to merge `main` into their local branches every time `main` is updated, which will cause our deployed product to have problems