---
path: "/intro"
title: "Introduction"
order: "1A"
section: "Initial Setup"
description: "Get to know the Intermediate Gatsby course and your instructor, Jason Lengstorf!"
---

In the [Intro to Gatsby](https://jason.af/intro-to-gatsby) course, we covered the basics of Gatsby and how to get up and running. In this course, we'll dive deeper into the advanced functionality of Gatsby!

## Prerequisites

- Node 12+ (this project uses Node v16.6.1)
- a [GitHub account](https://github.com/) (we'll use this to make the source code accessible for deployment)
- a [Netlify account](https://app.netlify.com/signup) (we'll use this to deploy the site from GitHub)
- the [Netlify CLI](https://ntl.fyi/cli) (we'll use this for managing environment variables and local development)
- [Yarn](https://yarnpkg.com/en/) (we'll use this for managing our monorepo and dependencies)

## How the repo works

There are two repos for this course: [the website you're currently on][site] and [the example project][project].

[project]: https://github.com/jlengstorf/frontend-masters-intermediate-gatsby-project
[site]: https://github.com/jlengstorf/frontend-masters-intermediate-gatsby

## Install the GitHub CLI

To get the site up and running, you'll need to fork the repo and clone it locally.

If you don't already have it, the [GitHub CLI](https://cli.github.com/) makes this _much_ easier. This is optional, but this is what we'll use throughout the project.

```bash
# if you don't already have it, install the GitHub CLI
brew install gh

# log in to GitHub
gh auth login
```

> For Windows or non-Homebrew solutions for macOS/Linux, see [the installation instructions](https://github.com/cli/cli#installation)

## Install the Netlify CLI

The Netlify CLI will be used both for local development and for deployment. It's not strictly required, but it will make this project significantly easier to build and deploy.

```bash
# we'll be using the Netlify CLI, so install the latest version if you don't have it
npm install -g netlify-cli@latest

# log into your Netlify account
ntl login
```

## Install Yarn

We need Yarn to manage our monorepo and dependencies. Install it using `npm`:

```bash
npm i -g yarn
```

> Note: if you don't want to use `npm`, you can [install Yarn other ways](https://classic.yarnpkg.com/en/docs/install).
