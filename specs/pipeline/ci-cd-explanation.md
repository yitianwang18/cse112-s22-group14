# Our CI/CD Pipeline

## Steps

1. Create a new branch from the `dev` branch
2. Develop locally on this branch
3. Test new code with existing tests
4. Create and run new tests for the new code
5. Create Pull Request to merge into `dev` branch, which will run GitHub Actions
6. Pull Request is approved after checking code quality and functionality
7. Test with new code added to `dev` since the branch was created
8. Create Pull Request to merge into `main` branch which will run GitHub Actions
9.  Deployed after Pull Request is approved after checking code quality and functionality

## Explanation

1. We create a new branch to allow multiple developers to work at the same time without causing merge conflicts. We are branching off of `dev` instead of `main` because `main` is only updated at the end of a sprint, while `dev` has any changes that have already been pushed for the current sprint.
2. Each developer will write the code for their task on their local branch.
3. Make sure that any new code that was written does not break any of code that was previously written by running the pre-existing tests with the new code included.
4. Create new tests for the new code that was added to ensure that it works and maintain our code coverage.
5. The `dev` branch is protected, so it requires a Pull Request to be approved before you can merge code into it. Creating a Pull Request will run GitHub Actions workflows for style checking and running unit tests.
6. The Pull Request will be manually checked by one of the leads to check for errors, adherance to coding conventions, sufficient testing, etc. Once they are approved, the code will be merged into `dev`.
7. Run tests again to make sure that multiple features that were added to `dev` during this sprint do not cause problems for each other. 
8. The `main` branch is protected, so it requires a Pull Request to be approved before you can merge code into it. Creating a Pull Request will run GitHub Actions workflows for style checking and running unit tests.
9. The Pull Request will be manually checked by one of the leads to check for errors, adherance to coding conventions, sufficient testing, etc. Once they are approved, the code will be merged into `main`. This will trigger a GitHub Actions workflow that will automatically deploy the updated website.

## Errors / Failures

If there are ever any errors or failures in any of the steps, return to Step 2, which is to develop locally in your own branch and progress through the pipeline like usual. 