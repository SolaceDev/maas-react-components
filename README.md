# maas-react-components

> React component library designed for Solace.

[![NPM](https://img.shields.io/npm/v/maas-react-components.svg)](https://github.com/SolaceDev/maas-react-components/packages/944783) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Setup npm registry

Before installing the package this step needs to be completed.

You can authenticate to GitHub Packages with npm by creating a npmrc file in your root directory.

```



@SolaceDev:registry=https://npm.pkg.github.com



//npm.pkg.github.com/:_authToken=GITHUB_TOKEN



```

GITHUB_TOKEN needs to be replaced by user specific github token. Make sure the package permissions ( write:packages, read:packages ) are correctly selected during token creation, and SSO is also enabled.

See this [link](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) to see how to create github token. Read more about [packages](https://docs.github.com/en/packages/learn-github-packages/about-permissions-for-github-packages) permissions.

## Install

```bash





npm install --save @SolaceDev/maas-react-components





```

### Custom Package Name

npm gives you the ability to import this package with a custom package name, which makes it easier to import components and use smaller names if that is a preference

For e.g. If a team wants to use the package named as common-components, install the package like this:

```



npm i common-components@SolaceDev/maas-react-components



```

See usage example below to see how it would impact the imports.

## Usage

```tsx
import React, { Component } from "react";

import { SolaceButton } from "@SolaceDev/maas-react-components";

//With custom named package

import { SolaceButton } from "common-components";

export default function Example() {
	return <SolaceButton />;
}
```

## Development

### Making a commit

Include one of the following values in a commit, before pushing your branch to master. This would trigger a automated package version update.

| Value                                     | Definition                                                                |
| ----------------------------------------- | ------------------------------------------------------------------------- |
| solacemajor Or SolaceMajor Or SOLACEMAJOR | MAJOR version when you make incompatible API changes                      |
| solaceminor Or SolaceMinor Or SOLACEMINOR | MINOR version when you add functionality in a backwards compatible manner |
| solacepatch Or SolacePatch Or SOLACEPATCH | PATCH version when you make backwards compatible bug fixes                |

[Semantic Versioning](https://semver.org/)

### Publishing Your Changes

Please see read [this resource](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release) to learn how to publish your changes (please note, you should always publish a new release whenever you merge changes to the repository.)

### Run locally

Follow the following steps to start component development on your local machines:

1. Run `npm run install:dev`. This will install required packages both for storybook and component library.

2. Run `npm start`. This should run the component and storybook library, all changes made to the components would be quickly reflected in component references created in storybook.

## View Storybook

To see the storybook visit: https://solid-garbanzo-f65ff422.pages.github.io/storybook-static/

You do need access to this repo to see the storybook.

## View Coverage Report

To see the storybook coverage report visit: https://solid-garbanzo-f65ff422.pages.github.io/lcov-report/

You do need access to this repo to see the storybook coverage report.

## Test locally on maas-ui

Make sure maas-react-components and maas-ui are using the same node version ( `node -v` ).

### In `maas-react-components`:

In `package.json`, change `module` to load `dist/index.js` so that you can debug with unminimized code.

Then, run `npm link`.

### In `maas-ui`:

`cd` into the micro-frontend folder (e.g. `ep` or `saas`) you want to test on.

```

npm uninstall @SolaceDev/maas-react-components

```

Make sure `@SolaceDev/maas-react-components` is no longer in the `node_modules` folder, then return to the micro-frontend folder you are testing.

```

npm link @SolaceDev/maas-react-components

```

Open `webpack.config.js`, and comment out

```

alias: {

"react-dom": "@hot-loader/react-dom"

}

```

Go to `localhost:9000` to make sure your `maas-react-component` changes are reflected.

To view the global link:

```

ls /Users/<your user name>/.nvm/versions/node/<node version>/lib/node_modules/

```

To remove the link:

```

npm rm --global @SolaceDev/maas-react-components

```

If getting react runtime or react-dom not found when loading pages, then do:

```

npm install -g react

npm install -g react-dom

```

### Switching back to the latest official `maas-react-components`

Remove @SolaceDev/maas-react-components from node_modules and run `npm install @SolaceDev/maas-react-components`.

## License

MIT © [](https://github.com/)
