---
path: "/add-shared-nav"
title: "Add a Shared Nav Component"
order: "5D"
section: "Build Custom Gatsby Themes"
description: "TKTK"
---

We want our shared nav to be configurable, and one of the most Gatsby-like ways to do that is to take advantage of the site metadata section of `gatsby-config.js`. Add a site title and an array of nav items to the theme's `siteMetadata` object making the following changes to `gatsby-theme-shared-nav/gatsby-config.js`:

```diff
  module.exports = {
+   siteMetadata: {
+     title: 'Gatsby Theme Shared Nav',
+     navItems: [
+       {
+         label: 'Home',
+         path: '/',
+       },
+     ],
+   },
    plugins: [
      {
        resolve: 'gatsby-plugin-layout',
        options: {
          component: require.resolve(__dirname + '/src/layouts/index.js'),
        },
      },
    ],
  };
```

## Add styles for the shared nav

To make our shared nav look nice, create `gatsby-theme-shared-nav/src/styles/nav.module.css` and add the following:

```css
.container {
  background: var(--black);
  color: var(--white);
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0.5rem 5vw;
}

.shared-nav {
  display: flex;
  justify-content: space-between;
}

.link {
  color: inherit;
  padding: 0.25rem;
  text-decoration: none;
}

.link:focus,
.link:hover {
  background: var(--white);
  color: var(--black);
}
```

## Create the shared nav component

Next, let's create the navigation component at `gatsby-theme-shared-nav/src/components/nav.js`:

```jsx
import { Link, useStaticQuery, graphql } from "gatsby";
import * as React from "react";
import { container, sharedNav, link } from "../styles/nav.module.css";

export function Nav() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          navItems {
            label
            path
          }
        }
      }
    }
  `);

  const navItems = data.site.siteMetadata.navItems;

  return (
    <header className={container}>
      <Link to="/" className={link}>
        {data.site.siteMetadata.title}
      </Link>
      <nav className={sharedNav}>
        {navItems.map((item) => (
          <Link key={`nav-${item.path}`} to={item.path} className={link}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
```

## Use the shared nav component

`gatsy-theme-shared-nav/src/components/layout.js`:

```diff
  import * as React from 'react';
+ import { Nav } from './nav.js';

  import '../styles/variables.css';
  import '../styles/global.css';
  import { content, footer } from '../styles/layout.module.css';

  export default function Layout({ children }) {
    return (
      <>
+       <Nav />
        <main className={content}>{children}</main>
        <footer className={footer}>Built with the Shared Nav Gatsby Theme</footer>
      </>
    );
  }
```
