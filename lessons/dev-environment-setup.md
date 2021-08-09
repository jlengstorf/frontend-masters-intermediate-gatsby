---
path: "/dev-environment-setup"
title: "Set Up Your Development Environment"
order: "1B"
section: "Welcome"
description: "TKTK"
---

Start by cloning the starter repo:

```bash
# fork and clone the project repo
gh repo fork jlengstorf/frontend-masters-intermediate-gatsby
```

> Note: this uses the [GitHub CLI `fork` command](https://cli.github.com/manual/gh_repo_fork). You can do this manually in the GitHub UI as well.

This project involves creating multiple packages that need to be used together. To avoid needing to publish all of these to npm for development (which is a cumbersome process), we'll instead be using [Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) to make local dev less painful.

We'll also be using [Netlify Dev](https://ntl.fyi/dev), which makes local development easier — especially when we get into things like environment variables and serverless functions later on.

For the most part, this won't be too different from other local dev setups, so let's point out the main differences:

## `package.json`

There's a `package.json` at the project root that defines which folders are packages.

```json
{
  "private": true,
  "workspaces": [
    "example"
  ],
  "scripts": {
    "develop": "yarn workspace example develop",
    "build": "yarn workspace example build"
  }
}
```

## `netlify.toml`

We'll use a `netlify.toml` to tell Netlify where the main development site is.

```toml
[build]
  base = "example"
```
