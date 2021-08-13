---
path: "/custom-resolvers"
title: "Create Custom Resolvers for Data Types"
order: "3C"
section: "Understanding Gatsby APIs"
description: "TKTK"
---

If you don't control the source dataset, you may find yourself in a situation where you need to transform data in some way. For example, you may want to add a link to buy a book based on the ISBN number.

To accomplish this, we'll use Gatsbys `createResolvers` API to define a new field on the `Book` type, then use some of the data each book contains to build a custom buy link.

Update `site/gatsby-node.js` with the following:

```diff
  const authors = require('./src/data/authors.json');
  const books = require('./src/data/books.json');

  exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
    const { createNode, createTypes } = actions;

    createTypes(`
      type Author implements Node {
        books: [Book!]! @link(from: "slug" by: "author.slug")
      }

      type Book implements Node {
        author: Author! @link(from: "author" by: "slug")
      }
    `);

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
+
+ exports.createResolvers = ({ createResolvers }) => {
+   const resolvers = {
+     Book: {
+       buyLink: {
+         type: 'String',
+         resolve: (source) =>
+           `https://www.powells.com/searchresults?keyword=${source.isbn}`,
+       },
+     },
+   };
+
+   createResolvers(resolvers);
+ };
```

Now we can query for the `buyLink` field on a book in GraphQL!
