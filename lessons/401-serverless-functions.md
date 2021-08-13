---
path: "/serverless-functions"
title: "Use Serverless Functions"
order: "6B"
section: "App-Like Features of Gatsby"
description: "TKTK"
---

In Gatsby 3, built-in support for serverless functions was introduced.

This gives us the ability to quickly write small chunks of server-like functionality that can run safely as if it were running on a server, but without all the boilerplate and operational overhead of running a server.

Let's create three small serverless functions that will let us fake logging in and out of our Gatsby app.

## Create a serverless function to "log in"

First, create a function that will set a cookie as if the user had succesfully logged in. Add this at `site/src/api/login.js`:

```js
export default function handler(_req, res) {
  res.setHeader("Set-Cookie", "frontend-masters-auth=true; path=/;");
  res.json({ status: "ok" });
}
```

Start the dev server and visit `http://localhost:8888/api/login` — you'll see the text `{"status":"ok"}` on the screen, and if you check your cookies in the dev tools, you'll see the `frontend-masters-auth` cookie is set to `true`.

## Create a serverless function to "log out"

Next, let's give our users the ability to "log out" as well. Create a function that will clear the cookie as if the user had logged out. Add this at `site/src/api/logout.js`:

```js
export default function handler(_req, res) {
  res.setHeader(
    "Set-Cookie",
    "frontend-masters-auth=false; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;"
  );
  res.json({ status: "ok" });
}
```

> Note: setting a cookie to expire in the past is how you tell the browser to delete the cookie.

## Create a serverless function to check the "logged in" status

Now, let's give our users the ability to check if they're logged in. Create a function that will return a boolean value based on whether the user is logged in. Add this at `site/src/api/check-auth.js`:

```js
export default function handler(req, res) {
  const loggedIn = Boolean(req.cookies && req.cookies["frontend-masters-auth"]);

  res.json({
    loggedIn,
  });
}
```

Try visiting this API endpoint after hitting `/api/login` and again after hitting `/api/logout` — depending on your current login status you'll see `{"loggedIn":true}` or `{"loggedIn":false}` on the screen.
