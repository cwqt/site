---
title: "Setting up TailwindCSS with Nx & Angular 11"
date: 2021-03-16T21:15:00Z
---

I spent a solid 3 days going through countless medium articles, reddit posts &
documentations looking for a way to get tailwind to play ball with this setup.
The easy part is getting tailwind to actually be a part of the bundle, but the
hard part was getting the purging, `@apply` & scss building to work correctly

## **1** installing tailwind & webpack

```shell
npm install -D @tailwindcss/jit tailwindcss postcss webpack @angular-builders/custom-webpack --force
```

## **2** create a `tailwind.scss` file

keep the tailwind styles separate from your actual `styles.scss` & add this to a
file called `tailwind.scss` in the `src/` directory of your angular app

```scss
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@layer base {
  p {
    @apply mb-3;
  }
}
```

## **3** update nx workspace.json

set your `FRONTEND.targets.build.styles` to look like this, with `tailwind.scss`
being the 1st element

```json
	"styles": [
		"apps/frontend/src/tailwind.scss",
		"apps/frontend/src/styles.scss",
	],
```

## **4** create a `webpack.config.js` & `tailwind.config.js` file

spread & push our config over top of the config nx creates when calling
`nx run frontend` etc.

```js
"use strict";
const webpack = require("webpack");
const path = require("path");

module.exports = async (config, context) => {
  console.log("Webpack running in", config.mode); // production, development

  // Add alias to allow for @frontend import, e.g.
  // import { Component } from "@frontend/component"
  config.resolve.alias = {
    ...config.resolve.alias,
    frontend: path.join(__dirname, "apps/frontend/src/app"),
  };

  config.module.rules.push({
    test: /tailwind\.scss$/,
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        ident: "postcss",
        syntax: "postcss-scss",
        plugins: [
          require("postcss-import"),
          // only purge classes when building production app
          require("tailwindcss")(
            require("./tailwind.config.js")(config.mode !== "development")
          ),
          require("autoprefixer"),
        ],
      },
    },
  });

  config.module.rules.push({
    test: /\.scss$/,
    loader: "sass-loader",
  });

  return config;
};
```

```js
// safelist array not currently supported, hack in a file with all safelisted classes
// for the tailwind/jit compiler to keep them in https://github.com/tailwindlabs/tailwindcss-jit/issues/32
module.exports = (isProduction) => ({
  prefix: "",
  purge: {
    enabled: isProduction,
    content: ["**/*.html", "**/*.ts", "./apps/frontend/safelist.txt"],
    options: {
      safelist: [],
    },
  },
  darkMode: false,
  theme: {},
  variants: {},
  plugins: [],
});
```

## **5** set angular to build using `custom-webpack` builder

for building:

```json
"frontend": {
	"projectType": "application",
	"root": "apps/frontend",
	"sourceRoot": "apps/frontend/src",
	"prefix": "app",
	"targets": {
		"build": {
			"executor": "@angular-builders/custom-webpack:browser",
			"options": {
				"customWebpackConfig": {
					"path": "apps/frontend/webpack.config.js"
				},
				...
```

and for serve:

```json
"serve": {
	"executor": "@angular-builders/custom-webpack:dev-server",
	"configurations": {
		"development": {
			"browserTarget": "frontend:build:development",
			"proxyConfig": "apps/frontend/proxy.conf.json"
		},
		...
```
