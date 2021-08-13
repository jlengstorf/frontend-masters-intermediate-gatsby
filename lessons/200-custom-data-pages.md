---
path: "/custom-data-pages"
title: "Create Pages from Custom Data Automatically"
order: "4E"
section: "Working With Custom Data"
description: "TKTK"
---

Creating pages from custom data in Gatsby is the same as any other data in Gatsby — that's the power of Gatsby's GraphQL approach.

This means that we can take advantage of Gatsby's file-based routing to automatically create pages for our author data.

## Install a helper package to turn text into slugs

Not every data type will come with a pre-created slug, so we need a way to turn a string into a slug.

Let's use [slugify](https://www.npmjs.com/package/slugify) in this project.

```bash
yarn workspace site add slugify
```

## Create a page for each author

Each author needs their own page. Create a new file at `site/pages/{Author.slug}.js` and add the following:

```jsx
import * as React from "react";
import { graphql, Link } from "gatsby";
import slugify from "slugify";

export const query = graphql`
  query($slug: String!) {
    author(slug: { eq: $slug }) {
      name
      books {
        id
        name
        series
        seriesOrder
      }
    }
  }
`;

function sortAndExtendBooks(books) {
  return books
    .sort((a, b) => a.seriesOrder - b.seriesOrder)
    .map((book) => {
      const series = book.series
        ? `(${book.series}, book ${book.seriesOrder})`
        : "";
      const displayName = `${book.name} ${series}`;
      const bookSlug = slugify(book.name, { lower: true });

      let path;
      if (book.series !== null) {
        const seriesSlug = slugify(book.series, { lower: true });
        path = `/book/${seriesSlug}/${bookSlug}`;
      } else {
        path = `/book/${bookSlug}`;
      }

      return { ...book, displayName, path };
    });
}

export default function AuthorPage({ data }) {
  const author = data.author;
  const books = sortAndExtendBooks(author.books);

  return (
    <div>
      <h1>{author.name}</h1>
      <p>Books by {author.name}:</p>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={book.path}>{book.displayName}</Link>
          </li>
        ))}
      </ul>
      <Link to="/authors">&larr; back to all authors</Link>
    </div>
  );
}
```

## Create a listing page for all authors

To display all authors for browsing, let's create a page that lists them all at `site/src/pages/authors.js`:

```jsx
import * as React from "react";
import { graphql, Link } from "gatsby";

export const query = graphql`
  query GetAllAuthors {
    allAuthor {
      nodes {
        name
        slug
      }
    }
  }
`;

export default function AuthorsPage({ data }) {
  const authors = data.allAuthor.nodes;

  return (
    <>
      <h1>Authors</h1>
      <ul>
        {authors.map((author) => (
          <li key={author.slug}>
            <Link to={`/${author.slug}`}>{author.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
```
