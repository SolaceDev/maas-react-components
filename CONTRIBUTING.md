# Contributing to maas-react-components

The following steps are required when contributing to the `maas-react-components` repository:

- create a ticket (task or bug ... please see "Creating A Ticket" below)
- raise a PR (see "Creating a Pull Request" below)
- receive approval from at minimum 1 reviewer
- merge the PR
- confirm all Github actions have passed (see "Confirming Successful Actions" below)
- publish a new release (see "Publishing a Release" below)
- close the tickets/task/bug (see "Close Tasks" below)

## Creating A Ticket

- If one does not already exist, please create a Jira ticket to explain the changes you are looking to implement
- within the ticket, please ensure the following fields are set:
  - SC Guild -> UI
  - Repositories -> maas-react-components
  - Squad -> if you are implementing the fix, please assign your respective squad (ex: Event Portal - ep runtime)
  - labels -> if applicable (select an apporpriate label or create a new one)
  - storypoints -> if applicable
  - Sprint -> if applicable

## Creating a Pull Request

- All changes are to be done on a branch and merged via a Pull Request back to the `main` branch.
- When opening your PR make sure you include solace_patch:, solace_minor: or solace_major: in your PR title (so the proper versioning will take place).
- Please include visual screen shots or a video highlighting your changes
- please add comments to your PR to provide reviewers with context
- There are currently no restrictions on needing to link your PR to a DATAGO, but it is reccommended that you do
- developers listed in the `CODEOWNERS` file shall automatically be included on all PRs raised ... additional reviewers will need to be added manually

## Confirming Succesful Actions

- Merging your PR will kickoff the actions in GitHub
- Check the Actions tab to make sure both the 'merge to main' and 'Chromatic publish' actions pass
  - should the 'Chromatic publish' fail (newly added components or modifications to an existing component will result in snapshot validation failure), find your build on the [Solace Chromatic app build page](https://solace.chromatic.com/builds?appId=6297777971a644004a314709) and review the changes (either accept the individual changes or fix any introduced bugs)
  - once the Chromatic changes have all been accepted, re-run the Chromatic publis job (now that you've accepted the new snapshots, job should pass)

## Publishing a Release

- From the main repo screen, click on the Releases link (on the right hand side)
- Click on "Draft a new release" button
- On the 'new release' page, select your tag (your merge gets taged with the latest version number from package.json automatically bumped for you)
- Specify a title and write a description (if you click the "Auto-generate release notes" button a link to the code diffs get attached to the description)
- Once you click publish, flip over to the Actions tab and make sure that passes

## Close Tasks

- if your task/bug introduced any UI changes:
  - transition the task/bug to verifying state
  - add a link to the associated Chromatic build as a comment on the task so the UI designer can quickly and easily review any visual changes
  - assign the task to one of the UI design team members (ex: @laurakvvo) so they may review and approve the changes
    - if UI designer feels there are still issues, they will
      - add a comment explaining what's wrong
      - transition the task back to implementing state
      - assign the task back to the developer
    - if UI designer feels comfortable with the change, they will
      - transition the task to the delivered state
      - assign the task back to the developer who will then close the task
