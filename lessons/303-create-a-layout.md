---
path: "/create-a-layout"
title: "Create a Layout"
order: "5C"
section: "Build Custom Gatsby Themes"
description: "TKTK"
---

Now that we have our theme up and running, let's create a layout component and the styles to make it look nice.

## Add CSS variables for shared styles

First, let's define site-wide colors in `gatsby-theme-shared-nav/src/styles/variables.css`:

```css
:root {
  --black: #222;
  --white: #fff;
  --text: #333;
}
```

## Add global CSS

Next, let's add global styles in `gatsby-theme-shared-nav/src/styles/global.css`:

```css
* {
  box-sizing: border-box;
}

html,
body {
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 18px;
  line-height: 1.4;
  margin: 0;
}
```

## Add styles for the custom layout

Now we can add scoped styles for the layout component itself in `gatsby-theme-shared-nav/src/styles/layout.module.css`:

```css
.content {
  margin: 3rem auto;
  max-width: 54ch;
}

.footer {
  font-size: 0.75rem;
  padding: 1rem 5vw;
  text-align: center;
}
```

## Create a custom layout component

All the styles are ready, so let's build out the layout component! `gatsby-theme-shared-nav/src/components/layout.js`:

```jsx
import * as React from "react";

import "../styles/variables.css";
import "../styles/global.css";
import { content, footer } from "../styles/layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <main className={content}>{children}</main>
      <footer className={footer}>Built with the Shared Nav Gatsby Theme</footer>
    </>
  );
}
```

## Add a plugin to automatically apply the layout to all pages

This theme is opinionated, so we want to automatically apply this layout to every page. To do that, let's install the `gatsby-plugin-layout` package in the theme.

```bash
yarn workspace gatsby-theme-shared-nav add gatsby-plugin-layout
```

## Configure the theme to use the layout

Tell our theme to use the plugin by updating `gatsby-theme-shared-nav/gatsby-config.js`:

```diff
- module.exports = {};
+ module.exports = {
+   plugins: [
+     {
+       resolve: 'gatsby-plugin-layout',
+       options: {
+         component: require.resolve(__dirname + '/src/components/layout.js'),
+       },
+     },
+   ],
+ };
```

At this point, the theme will start applying the layout component to all pages. Check it out by running `ntl dev`.
