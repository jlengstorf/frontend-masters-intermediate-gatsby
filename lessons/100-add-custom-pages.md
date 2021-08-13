---
path: "/add-custom-pages"
title: "Add Custom Pages to Gatsby"
order: "2A"
section: "Understanding Gatsby APIs"
description: "TKTK"
---

Gatsby provides a number of Node APIs that allow us to customize its behavior. These are invoked by exporting a function from a special file called `gatsby-node.js`, which lives at the site root (wherever the `gatsby-config.js` file lives).

One of the most useful Node APIs is `createPages`, which allows us to create custom pages using any data we want.

Creating a custom page has two required fields:

1. The `path` of the page (e.g. `/my-custom-page`)
2. The path to a component to use as the page template

We can also provide an optional `context` object, which will be passed to the template component as a prop.

## Create a template component for a custom Gatsby page

Create a new file at `site/src/templates/custom.js` with the following code inside:

```jsx
import * as React from "react";

export default function Custom({ pageContext }) {
  return (
    <div>
      <h1>{pageContext.title}</h1>
      <pre>{JSON.stringify(pageContext, null, 2)}</pre>
    </div>
  );
}
```

> Note: the `pageContext` prop contains whatever we pass into the `context` field of `createPage`. By default it's an empty object.

## Create a custom page using the Gatsby Node APIs

To use the `createPages` API to add a custom page, create a new file at `site/gatsby-node.js` and add the following code:

```js
exports.createPages = ({ actions }) => {
  const { createPage } = actions;

  createPage({
    path: "/custom",
    component: require.resolve("./src/templates/custom.js"),
    context: {
      title: "A Custom Page!",
      meta: {
        description: "A custom page with context.",
      },
    },
  });
};
```

Restart the development server and visit `/custom` to see your custom page!
