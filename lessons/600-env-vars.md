---
path: "/env-vars"
title: "Managing Environment Variables in Gatsby"
order: "7A"
section: "Deployment"
description: "TKTK"
---

Env vars in Gatsby can be a little confusing at first. Client-side code can't see all environment variables. The only ones that it can see are those prefixed with `GATSBY_` — this is a security measure because sensitive variables shouldn't be used in client-side code.

Let's take a look at how this works by creating a private env var, a public env var, and then trying to look at the values in both a serverless function and the Gatsby site itself.

## Create environment variables for the site using the Netlify CLI

Netlify's CLI makes it extremely fast to set up environment variables for both local dev and production.

Add two new env vars using the CLI:

```bash
# set a public env var
ntl env:set GATSBY_PUBLIC_VALUE safetoshare

# set a private env var
ntl env:set SECRET_VALUE thisisasecret
```

## Try to display the env vars on the site

First, let's try to display both our public and private env vars on the site.

```jsx
import * as React from "react";

export default function EnvVarsPage() {
  return (
    <>
      <h1>Environment Variables</h1>
      <ul>
        <li>GATSBY_PUBLIC_VALUE: {process.env.GATSBY_PUBLIC_VALUE}</li>
        <li>SECRET_VALUE: {process.env.SECRET_VALUE}</li>
      </ul>
    </>
  );
}
```

> Note: you should _not_ try to show private env vars on a website!

## Try to display the env vars in a serverless function

Next, let's see if we can get the env vars from a serverless function.

```js
export default function handler(_req, res) {
  res.json({
    GATSBY_PUBLIC_VALUE: process.env.GATSBY_PUBLIC_VALUE,
    SECRET_VALUE: process.env.SECRET_VALUE,
  });
}
```

> Note: **this is a terrible, insecure idea.** This is _only_ to demonstrate that serverless functions have access to secret env vars — _do not_ use this in production.

When we run Netlify Dev, we can see that the env vars are pulled down from Netlify and are available for local dev. We can also see that the secret value is NOT available in the site, but it does show up in the serverless function.

This is good news! It means we can add secure values to our environment variables and not expose them to the client-side code.
