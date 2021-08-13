---
path: "/custom-data-pages-manual"
title: "Create Pages from Custom Data Manually"
order: "4F"
section: "Working With Custom Data"
description: "TKTK"
---

When we created our author pages, you may remember that the books had different slugs depending on whether they were part of a series or not.

Since the slugs vary, we can't use the file-based routing to create pages in this case. Instead, let's use the `createPages` API and some custom logic to create the book pages in the right place.

## Create styles for the book listing

To make our book listings a bit more presentable, let's create the bare minimum styles required in a CSS module. Add a new file at `site/src/styles/book.modules.css` with the following content:

```css
.listing {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.heading {
  margin: 0;
}
```

## Create a template for individual book pages

Creating pages with the `createPages` API requires a template. Create a new file at `site/src/templates/book.js` with the following content:

```jsx
import * as React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { listing, heading } from "../styles/book.module.css";

export const query = graphql`
  query($id: String!) {
    book(id: { eq: $id }) {
      isbn
      name
      author {
        slug
        name
      }
      series
      seriesOrder
      cover {
        childImageSharp {
          gatsbyImageData(width: 150)
        }
      }
    }
  }
`;

export default function Book({ data }) {
  const book = data.book;

  return (
    <>
      <div className={listing}>
        <GatsbyImage image={getImage(book.cover)} alt={book.name} />
        <div>
          <h1 className={heading}>{book.name}</h1>
          <p>
            Author: <Link to={`/${book.author.slug}`}>{book.author.name}</Link>
          </p>
          {book.series && (
            <p>
              This is book {book.seriesOrder} of the {book.series}.
            </p>
          )}
        </div>
      </div>
      <Link to="/books">&larr; back to all books</Link>
    </>
  );
}
```

## Create individual book pages using the createPages API

With the template ready to go, we can create custom pages! Add the following code to `site/gatsby-node.js`:

```diff
  const fetch = require('node-fetch');
  const { createRemoteFileNode } = require('gatsby-source-filesystem');
  const slugify = require('slugify');

  const authors = require('./src/data/authors.json');
  const books = require('./src/data/books.json');

  exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
    // function content omitted
  };

  exports.createPages = async ({ actions, graphql }) => {
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
+
+   const result = await graphql(`
+     query GetBooks {
+       allBook {
+         nodes {
+           id
+           series
+           name
+         }
+       }
+     }
+   `);
+
+   const books = result.data.allBook.nodes;
+
+   books.forEach((book) => {
+     const bookSlug = slugify(book.name, { lower: true });
+
+     if (book.series === null) {
+       createPage({
+         path: `/book/${bookSlug}`,
+         component: require.resolve(`./src/templates/book.js`),
+         context: {
+           id: book.id,
+         },
+       });
+     } else {
+       const seriesSlug = slugify(book.series, { lower: true });
+
+       createPage({
+         path: `/book/${seriesSlug}/${bookSlug}`,
+         component: require.resolve(`./src/templates/book.js`),
+         context: {
+           id: book.id,
+         },
+       });
+     }
+   });
  };

  exports.createResolvers = ({
    actions,
    cache,
    createNodeId,
    createResolvers,
    store,
    reporter,
  }) => {
    // function content omitted
  };
```

## Create a listing page for books

Finally, let's create a listing page to display all of our books. Add a new file at `site/src/pages/books.js` with the following content:

```jsx
import * as React from "react";
import { graphql, Link } from "gatsby";
import slugify from "slugify";

export const query = graphql`
  query GetAllBooks {
    allBook {
      nodes {
        id
        name
        author {
          name
          slug
        }
        series
      }
    }
  }
`;

export default function BooksPage({ data }) {
  const books = data.allBook.nodes;

  return (
    <>
      <h1>Books</h1>
      <ul>
        {books.map((book) => {
          const bookSlug = slugify(book.name, { lower: true });

          let path;
          if (book.series) {
            const seriesSlug = slugify(book.series, { lower: true });

            path = `/book/${seriesSlug}/${bookSlug}`;
          } else {
            path = `/book/${bookSlug}`;
          }

          return (
            <li key={book.id}>
              <Link to={path}>{book.name}</Link>, by{" "}
              <Link to={`/${book.author.slug}`}>{book.author.name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
```
