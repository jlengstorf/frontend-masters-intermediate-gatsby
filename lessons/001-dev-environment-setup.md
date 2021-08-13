---
path: "/dev-environment-setup"
title: "Set Up Your Development Environment"
order: "1B"
section: "Initial Setup"
description: "TKTK"
---

Start by cloning the starter repo:

```bash
# fork and clone the project repo
gh repo fork jlengstorf/frontend-masters-intermediate-gatsby-project

# move into the forked repo
cd frontend-masters-intermediate-gatsby-project
```

> Note: this uses a [GitHub CLI command](https://cli.github.com/manual/gh_repo_fork) to fork the repo. You can do this manually in the GitHub UI as well.

## What's in the starter repo?

This repo will eventually be a monorepo, so it's organized a bit differently than many Gatsby projects — most notably, there's a `site` folder that the site files live in.

- `site/src/pages/index.js` — a bare bones React component that's the entry point for the site
- `site/src/data/` — a folder with some JSON data that we'll use later in the project
- `site/gatsby-config.js` — used to configure Gatsby, but currently exporting an empty object
- `site/package.json` — baseline dependencies and commands to run a Gatsby site
- `.gitignore` — the files and directories we don't want to track in Git
- `.nvmrc` — the version of Node we'll be using
- `.prettierrc` — the configuration for the [Prettier](https://prettier.io/) code formatter
- `package.json` — the dependencies for the project and the commands we'll need to run Gatsby
- `README.md` — basic info about the project

## Set your Node version

Before we start, make sure you're using the version of Node required for this project. The code in this course was written using Node 16.6.1. — strictly speaking, Gatsby will support back to Node 12, but for a greenfield site let's use the latest version.

We'll be using [`nvm`](https://github.com/nvm-sh/nvm#installing-and-updating) to manage the Node version.

```bash
# because our project has an .nvmrc file, we don't need to specify the version
nvm install
```
