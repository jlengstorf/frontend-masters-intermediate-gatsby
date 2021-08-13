---
path: "/set-up-theme-development"
title: "Set Up Theme Development"
order: "5A"
section: "Build Custom Gatsby Themes"
description: "TKTK"
---

To this point, we've been working with a mostly unstyled site. We _could_ remedy that by adding styles into our existing site, but what if we want to make our styles a base that can be shared across multiple sites?

That's where Gatsby Themes come in.

## Create the bare minimum file structure for a Gatsby Theme

To get started with Gatsby Themes, we need to create a new folder with two files in it:

```
/gatsby-theme-shared-nav
  - gatsby-config.js
  - package.json
```

Inside `gatsby-theme-shared-nav/gatsby-config.js`, we can export an empty object:

```js
module.exports = {};
```

In `gatsby-theme-shared-nav/package.json`, add a few details about the theme package:

```js
{
  "name": "gatsby-theme-shared-nav",
  "version": "1.0.0",
  "main": "gatsby-config.js",
  "license": "MIT"
}
```

## Add the theme to Yarn Workspaces

To make this theme available for local development, we need to add it to our Yarn Workspaces. Update the root-level `package.json` file with the following:

```diff
  {
    "private": true,
    "workspaces": [
-     "site"
+     "site",
+     "gatsby-theme-shared-nav"
    ],
    "scripts": {
      "develop": "yarn workspace site develop",
      "build": "yarn workspace site build"
    }
  }
```

## Add Gatsby as a peer dependency.

To make sure the theme will complain if it's used without Gatsby, add Gatsby as a peer dependency:

```bash
yarn workspace gatsby-theme-shared-nav add -P gatsby
```

At this point, the theme doesn't do anything, but it's installable.
