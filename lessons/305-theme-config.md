---
path: "/theme-config"
title: "Configure a Gatsby Theme"
order: "5F"
section: "Build Custom Gatsby Themes"
description: "TKTK"
---

Gatsby themes will read the `gatsby-config.js` of the current site and fall back to the values set in their own `gatsby-config.js` file if necessary.

This means that we can customize the nav items in our shared nav theme by adding them to our site's `gatsby-config.js` site metadata.

Add the following to `site/gatsby-config.js`:

```diff
  module.exports = {
+   siteMetadata: {
+     title: 'My Book Club',
+     navItems: [
+       {
+         label: 'Books',
+         path: '/books',
+       },
+       {
+         label: 'Authors',
+         path: '/authors',
+       },
+       {
+         label: 'Account',
+         path: '/account',
+       },
+     ],
+   },
    plugins: [
      'gatsby-theme-shared-nav',
      'gatsby-plugin-image',
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp',
    ],
  };
```

> Note: "Account" doesn't exist yet — don't worry! We'll build that soon.
