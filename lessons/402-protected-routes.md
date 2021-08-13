---
path: "/protected-routes"
title: "Protected Routes"
order: "6C"
section: "App-Like Features of Gatsby"
description: "TKTK"
---

In many apps we want to make sure that only authorized users can access content.

While implementing a full-blown auth system is out of the scope of this tutorial, we'll use the mocked up auth management we set up with serverless functions to show how we can protect routes based on auth status in Gatsby.

## Create a login page

If our users are logged out, they'll need to "log in" from somewhere. Create a new file at `site/pages/account/login.js` with the following content:

```jsx
import * as React from "react";
import { navigate } from "gatsby";

async function checkLogin(setLoginStatus) {
  const { loggedIn = false } = await fetch("/api/check-auth").then((res) =>
    res.json()
  );

  setLoginStatus(loggedIn);
}

async function login() {
  const { status } = await fetch("/api/login").then((res) => res.json());

  if (status !== "ok") {
    throw new Error(status);
  }

  navigate("/account/dashboard");
}

export default function LoginPage() {
  const [loginStatus, setLoginStatus] = React.useState();

  React.useEffect(() => {
    checkLogin(setLoginStatus);
  }, []);

  if (loginStatus === true) {
    navigate("/account/dashboard", { replace: true });
    return null;
  }

  return <button onClick={login}>Login</button>;
}
```

## Create a dashboard page

For logged in users, we want to show a dashboard. Create a new file at `site/pages/account/dashboard.js` with the following content:

```js
import { navigate } from "gatsby";
import * as React from "react";

async function checkLogin(setLoginStatus) {
  const { loggedIn = false } = await fetch("/api/check-auth").then((res) =>
    res.json()
  );

  setLoginStatus(loggedIn);
}

async function logout() {
  const { status } = await fetch("/api/logout").then((res) => res.json());

  if (status !== "ok") {
    throw new Error(status);
  }

  navigate("/account/login");
}

export default function LoginPage() {
  const [loginStatus, setLoginStatus] = React.useState();

  React.useEffect(() => {
    checkLogin(setLoginStatus);
  }, []);

  if (loginStatus === false) {
    navigate("/account/login", { replace: true });
    return null;
  }

  return loginStatus === true ? (
    <div>
      <h1>Wow, look at all this secret stuff!</h1>
      <button onClick={logout}>Log Out</button>
    </div>
  ) : null;
}
```

## Create a client-only catch-all route

If someone visits a page in the `/account` part of the site that doesn't exist, we want to redirec them to the dashboard (or login, if necessary).

To do that, let's create a client-only catch-all route at `site/pages/account/[...].js` with the following code:

```jsx
import * as React from "react";
import { navigate } from "gatsby";

export default function RedirectToAccountDashboard() {
  React.useEffect(() => {
    navigate("/account/dashboard", { replace: true });
  }, []);

  return null;
}
```
