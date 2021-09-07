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

npm gives you the ability to import this package with a custom package name, which makes it easier to import components and use smaller names if that is a preference.

For e.g. If a team wants to use the package named as common-components, install the package like this

```

npm i common-components@SolaceDev/maas-react-components

```

See usage example below to see how it would impact the imports.

## Usage

```tsx
import React, { Component } from "react";

import { SolaceButton } from "@SolaceDev/maas-react-components";

//With custom named package

import { SolaceButton } from "common-component";

export default function Example() {
	return <SolaceButton />;
}
```

## Development

Follow the following steps to start component development on your local machines:

1.  Run `npm run install:dev`. This will install required packages both for storybook and component library.
2.  If this is the **first time** you are developing on this repo run `npm run dev:link`. **Note: this step is only required only once**.
3.  If this is the **first time** you are developing on this repo, change to the storybook directory `cd ./storybook`, then `npm install` so that we can install the link to `@SolaceDev/maas-react-components`
4.  Navigate back up to the base component directory `cd ..`
5.  Start the application and storybook with `npm start`

All subsequent times (after you've installed and linked everything once), run `npm start` from the base directory and all should work

**Note for developers** : Don't forget to include one of the following values in a commit, before pushing your branch to master. This would trigger a automated package version update.

| value | defintition                                                               |
| ----- | ------------------------------------------------------------------------- |
| major | MAJOR version when you make incompatible API changes                      |
| minor | MINOR version when you add functionality in a backwards compatible manner |
| patch | PATCH version when you make backwards compatible bug fixes                |

[Semantic Versioning](https://semver.org/)

## License

MIT © [](https://github.com/)
