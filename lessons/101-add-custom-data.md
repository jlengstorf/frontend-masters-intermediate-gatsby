---
path: "/add-custom-data"
title: "Add Custom Data to Gatsby"
order: "3A"
section: "Understanding Gatsby APIs"
description: "TKTK"
---

We can also add custom data to Gatsby's GraphQL layer using the `sourceNodes` API.

## Add author and book data to Gatsby's GraphQL layer

In `site/gatsby-node.js`, add a new export for the `sourceNodes` API and add the following inside:

```diff
+ const authors = require('./src/data/authors.json');
+ const books = require('./src/data/books.json');
+
+ exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
+   const { createNode } = actions;
+
+   authors.forEach((author) => {
+     createNode({
+       ...author,
+       id: createNodeId(`author-${author.slug}`),
+       parent: null,
+       children: [],
+       internal: {
+         type: 'Author',
+         content: JSON.stringify(author),
+         contentDigest: createContentDigest(author),
+       },
+     });
+   });
+
+   books.forEach((book) => {
+     createNode({
+       ...book,
+       id: createNodeId(`book-${book.isbn}`),
+       parent: null,
+       children: [],
+       internal: {
+         type: 'Book',
+         content: JSON.stringify(book),
+         contentDigest: createContentDigest(book),
+       },
+     });
+   });
+ };

  exports.createPages = ({ actions }) => {
    const { createPage } = actions;

    createPage({
      path: '/custom',
      component: require.resolve('./src/templates/custom.js'),
      context: {
        title: 'A Custom Page!',
        meta: {
          description: 'A custom page with context.',
        },
      },
    });
  };
```

> Note: this uses the JSON data that was included with the project starting point.
