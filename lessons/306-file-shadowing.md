---
path: "/file-shadowing"
title: "Use File Shadowing to Override Themes"
order: "5F"
section: "Build Custom Gatsby Themes"
description: "TKTK"
---

Gatsby Themes make it quick to share a consistent look and feel across your site, but what happens if we want to customize the theme?

To handle customization without needing to fully eject from the theme, Gatsby supports a concept called "shadowing" that allows us to selectively override any file in a theme from within your site.

Let's customize our site colors by shadowing the CSS variables file.

In your site, create a new file at `site/src/gatsby-theme-shared-nav/styles/variables.css` and add the following:

```css
:root {
  --black: darkblue;
  --white: #fff;
  --text: #333;
}
```

> Note: you have to shadow the _entire_ file. Standard practice is to copy paste the file and make selective edits.

Restart the development server and you'll see the new color applied!
