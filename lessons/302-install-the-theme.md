---
path: "/install-the-theme"
title: "Install the Custom Theme"
order: "5B"
section: "Build Custom Gatsby Themes"
description: "TKTK"
---

Themes in Gatsby are installed in the same way as plugins.

To install our theme in development, we need Yarn Workspaces:

```bash
yarn workspace example add gatsby-theme-shared-nav@"*"
```

## Configure the theme in our site

To install the theme on our site, modify `site/gatsby-config.js` with the following:

```diff
  module.exports = {
    plugins: [
+     'gatsby-theme-shared-nav',
      'gatsby-plugin-image',
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp',
    ],
  };
```

Start the site with `ntl dev` and it'll run, but nothing will change (yet).
