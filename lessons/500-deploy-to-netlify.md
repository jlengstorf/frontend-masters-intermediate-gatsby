---
path: "/deploy-to-netlify"
title: "Deploy a Gatsby Site to Netlify"
order: "7A"
section: "Deployment"
description: "TKTK"
---

At this point, the site is ready to show the world! Let's deploy it to Netlify using the Netlify CLI.

## Add Netlify deployment settings

Because we're using a monorepo, we need to add a bit of config to make sure Netlify builds the right part of the project.

Specifically, we want to use the Yarn workspace command to build the site, and we want to set an environment variable to ensure that Yarn is used.

Create a file at `site/netlify.toml` and put the following inside:

```toml
[build]
  command = "yarn workspace site build"
  publish = "public"
  environment = { NETLIFY_USE_YARN = "true" }
```

## Add the Gatsby Netlify plugin

Since we're using client-only routes, we need redirect support. To get this automatically set up, we'll use the [Gatsby Netlify plugin](https://www.gatsbyjs.com/plugins/gatsby-plugin-netlify/).

```bash
yarn workspace site add gatsby-plugin-netlify
```

In `site/gatsby-config.js`, add the following:

```diff
  module.exports = {
    siteMetadata: {
      title: 'My Book Club',
      navItems: [
        {
          label: 'Books',
          path: '/books',
        },
        {
          label: 'Authors',
          path: '/authors',
        },
        {
          label: 'Account',
          path: '/account',
        },
      ],
    },
    plugins: [
      'gatsby-theme-shared-nav',
      'gatsby-plugin-image',
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp',
+     'gatsby-plugin-netlify',
    ],
  };
```

## Deploy the site with the Netlify CLI

Next, we can commit our changes and deploy the site to Netlify.

```bash
# make sure all the files are committed
git add -A
git commit -m 'site ready to deploy'

# push the changes to GitHub
git push origin main

# create a new site on Netlify
ntl init
```

This will take the site live!
