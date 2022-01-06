# Contributing to maas-react-components

## Creating a Pull Request

- All changes are to be done on a branch and merged via a Pull Request back to the `main` branch.
- When opening your PR make sure you include patch:, minor: or major: in your PR title (so the proper versioning will take place).
- There are currently no restrictions on needing to link your PR to a DATAGO, but it is reccommended that you do

## Confirming succesful Actions

- Merging your PR will kickoff the actions in GitHub
- Check the Actions tab to make sure both the 'merge to main' and 'Chromatic publish' actions pass

## Publishing a Release

- From the main repo screen, click on the Releases link (on the right hand side)
- Click on "Draft a new release" button
- On the 'new release' page, select your tag (your merge gets taged with the latest version number from package.json automatically bumped for you)
- Specify a title and write a description (if you click the "Auto-generate release notes" button a link to the code diffs get attached to the description)
- Once you click publish, flip over to the Actions tab and make sure that passes
