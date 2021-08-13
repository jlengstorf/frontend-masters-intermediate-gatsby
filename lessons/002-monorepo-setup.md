---
path: "/monorepo-setup"
title: "Configure a Monorepo"
order: "1C"
section: "Initial Setup"
description: "TKTK"
---

This project involves creating multiple packages that need to be used together. To avoid needing to publish all of these to npm for development (which is a cumbersome process), we'll instead be using [Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) to make local dev less painful.

We'll also be using [Netlify Dev](https://ntl.fyi/dev), which makes local development easier — especially when we get into things like environment variables and serverless functions later on.

For the most part, this won't be too different from other local dev setups, so let's point out the main differences:

## `package.json`

There's a `package.json` at the project root that defines which folders are packages.

```json
{
  "private": true,
  "workspaces": ["site"],
  "scripts": {
    "develop": "yarn workspace site develop",
    "build": "yarn workspace site build"
  }
}
```

## `netlify.toml`

We'll use a `netlify.toml` to tell Netlify where the main development site is.

```toml
[build]
  base = "site"
```

## Start the local dev server

Now that the monorepo is configured, we can start the local dev server using Netlify Dev.

```bash
# install the project dependencies
yarn

# start the dev server
ntl dev
```

This will automatically detect that we're running a Gatsby site in a monorepo and start a server at `http://localhost:8888`.
