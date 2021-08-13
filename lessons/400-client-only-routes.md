---
path: "/client-only-routes"
title: "Create Client-Only Routes"
order: "6A"
section: "App-Like Features of Gatsby"
description: "TKTK"
---

While Gatsby is extremely powerful at prerendering content, it's also great for client-only apps. With the addition of dynamic routing in Gatsby 3, it's delightfully straightforward to add a client-only route to your Gatsby site.

For this project, let's create a book search. This relies on user input, so there's no way for us to know what content will be on the page ahead of time — it needs to be dynamically generated.

## Create styles for the client-only route

We'll need a few styles handy for the search form, so create a new file at `site/src/styles/search.module.css` and add the following:

```css
.form {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.input {
  font-size: 1rem;
  padding: 0.25rem 1rem;
  width: 100%;
}

.button {
  font-size: 1rem;
  padding: 0.25rem 1rem;
}
```

## Create a client-only dynamic page

To create client-only pages, we use square brackets around a parameter name in the page filename. For example, if we wanted to get someone's username out of the URL, we could create a filename like `/users/[username].js`.

For this example, we're going to use a catch-all dynamic route inside a folder, which will cause every URL that starts with our folder name to be routed to this component.

Create a new file at `site/src/pages/search/[...].js` with the following content:

```jsx
import * as React from "react";
import { navigate } from "gatsby";

import { form, input, button } from "../../styles/search.module.css";

export default function BookClientOnly({ params }) {
  const query = decodeURIComponent(params["*"]);
  const [currentQuery, setCurrentQuery] = React.useState(query);
  const [result, setResult] = React.useState(null);
  const [status, setStatus] = React.useState("IDLE");

  function handleSearch(event) {
    event.preventDefault();

    const form = new FormData(event.target);
    const query = form.get("search");

    setCurrentQuery(query);
    navigate(`/search/${encodeURIComponent(query)}`);
  }

  function handleSearchReset(event) {
    setCurrentQuery("");
    navigate("/search/");
  }

  async function bookSearch(query) {
    setStatus("LOADING");
    const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);

    if (!res.ok) {
      throw new Error(`Search failed: ${res.status}`);
    }

    const result = await res.json();

    setResult(result);
    setStatus("IDLE");
  }

  React.useEffect(() => {
    if (currentQuery === "") {
      setResult(null);
      return;
    }

    bookSearch(currentQuery);
  }, [currentQuery]);

  return (
    <>
      <h1>Search for a Book</h1>
      <form className={form} onSubmit={handleSearch}>
        <input className={input} type="search" name="search" />
        <button className={button}>search</button>
        <button className={button} type="reset" onClick={handleSearchReset}>
          reset
        </button>
      </form>

      {status === "LOADING" && <p>Loading results...</p>}

      {status === "IDLE" && currentQuery !== "" ? (
        <>
          <h2>Search results for "{currentQuery}":</h2>
          <ul>
            {result &&
              result.docs.map((doc) => (
                <li key={doc.key}>
                  <strong>{doc.title}</strong>{" "}
                  {doc.author_name && `by ${doc.author_name?.[0]}`}
                </li>
              ))}
          </ul>
        </>
      ) : null}
    </>
  );
}
```

## Create a client-only fallback route to redirect to the dashboard

If someone hits either the root (`/account`) or a URL that doesn't exist inside the account path, we want to redirect them to the dashboard.

To do that, let's create a fallback catch-all route at `site/src/pages/account/[...].js`:

```jsx
import { navigate } from "gatsby";

export default function RedirectToAccountDashboard() {
  navigate("/account/dashboard", { replace: true });

  return null;
}
```
