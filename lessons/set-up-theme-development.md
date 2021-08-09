---
path: "/set-up-theme-development"
title: "Set Up Theme Development"
order: "3A"
section: "Build Custom Gatsby Themes"
description: "TKTK"
---

TKTK

```
/gatsby-theme-shared-nav
  - gatsby-config.js
  - package.json
```

`gatsby-config.js`:

```js
module.exports = {
  plugins: [],
};
```

`package.json`:

```js
{
  "name": "gatsby-theme-shared-nav",
  "version": "1.0.0",
  "main": "gatsby-config.js",
  "license": "MIT"
}
```

Add Gatsby as a peer dependency:

```bash
yarn workspace gatsby-theme-shared-nav add -P gatsby
```

This theme doesn't do anything, but it's installable.
