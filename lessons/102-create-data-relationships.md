---
path: "/create-data-relationships"
title: "Create Relationships Between Data Nodes"
order: "3B"
section: "Understanding Gatsby APIs"
description: "TKTK"
---

TKTK

```diff
  const authors = require('./src/data/authors.json');
  const books = require('./src/data/books.json');

  exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
-   const { createNode } = actions;
+   const { createNode, createTypes } = actions;
+
+   createTypes(`
+     type Author implements Node {
+       books: [Book!]! @link(from: "slug" by: "author.slug")
+     }
+
+     type Book implements Node {
+       author: Author! @link(from: "author" by: "slug")
+     }
+   `);

    authors.forEach((author) => {
      createNode({
        ...author,
        id: createNodeId(`author-${author.slug}`),
        parent: null,
        children: [],
        internal: {
          type: 'Author',
          content: JSON.stringify(author),
          contentDigest: createContentDigest(author),
        },
      });
    });

    books.forEach((book) => {
      createNode({
        ...book,
        id: createNodeId(`book-${book.isbn}`),
        parent: null,
        children: [],
        internal: {
          type: 'Book',
          content: JSON.stringify(book),
          contentDigest: createContentDigest(book),
        },
      });
    });
  };

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
