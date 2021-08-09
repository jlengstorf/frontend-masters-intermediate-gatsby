module.exports = {
  siteMetadata: {
    title: "Intermediate Gatsby",
    subtitle: "Now with 100% more boops!",
    description: "Learn advanced Gatsby techniques from Jason Lengstorf!",
    keywords: [
      "react",
      "react.js",
      "frontend masters",
      "gatsby",
      "graphql",
      "jason lengstorf",
      "js",
      "front end",
      "serverless",
      "serverless functions",
    ],
  },
  pathPrefix: "/intermediate-gatsby",
  plugins: [
    `gatsby-plugin-layout`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/lessons`,
        name: "markdown-pages",
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-prismjs`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: true,
              sizeByPixelDensity: false,
            },
          },
        ],
      },
    },
  ],
};
