---
path: "/remote-images"
title: "Handle Remote Images"
order: "3D"
section: "Understanding Gatsby APIs"
description: "TKTK"
---

Gatsby has excellent image optimization, but what if our custom data has images from external URLs?

We can tell Gatsby to pull in and optimize those images for us at build time by creating what's called a "remote file node".

This requires adding a package for sending HTTP requests and a new Gatsby plugin to our project.

```bash
yarn workspace site add node-fetch gatsby-source-filesystem
```

> Note: don't forget that we're using Yarn workspaces! That means we have to add the packages _to the workspace_, not the root.

## Add a remote file node to book data

Update `site/gatsby-node.js` with the following:

```diff
+ const fetch = require('node-fetch');
+ const { createRemoteFileNode } = require('gatsby-source-filesystem');
+
  const authors = require('./src/data/authors.json');
  const books = require('./src/data/books.json');

  exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
    // function contents omitted for brevity
  };

  exports.createPages = ({ actions }) => {
    // function contents omitted for brevity
  };

- exports.createResolvers = ({ createResolvers }) => {
+ exports.createResolvers = ({
+   actions,
+   cache,
+   createNodeId,
+   createResolvers,
+   store,
+   reporter,
+ }) => {
+   const { createNode } = actions;
+
    const resolvers = {
      Book: {
        buyLink: {
          type: 'String',
          resolve: (source) =>
            `https://www.powells.com/searchresults?keyword=${source.isbn}`,
        },
+       cover: {
+         type: 'File',
+         resolve: async (source) => {
+           const response = await fetch(
+             `https://openlibrary.org/isbn/${source.isbn}.json`,
+           );
+
+           if (!response.ok) {
+             reporter.warn(
+               `Error loading details about ${source.name} — got ${response.status} ${response.statusText}`,
+             );
+             return null;
+           }
+
+           const { covers } = await response.json();
+
+           if (covers.length) {
+             return createRemoteFileNode({
+               url: `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`,
+               store,
+               cache,
+               createNode,
+               createNodeId,
+               reporter,
+             });
+           } else {
+             return null;
+           }
+         },
+       },
      },
    };

    createResolvers(resolvers);
  };
```

## Create an optimized version of the image

Now we have a `File` node, but we can't do much with it. To actually optimize the image, we need to add the Gatsby image plugin and the companion Sharp plugin and transformer.

```bash
yarn workspace site add gatsby-plugin-image gatsby-plugin-sharp gatsby-transformer-sharp
```

Add them to Gatsby by adding the following to `site/gatsby-config.js`:

```diff
- module.exports = {};
+ module.exports = {
+   plugins: [
+     'gatsby-plugin-image',
+     'gatsby-plugin-sharp',
+     'gatsby-transformer-sharp',
+   ],
+ };
```

Restart the Gatsby development server and you'll see optimized images are now created for each book cover!
