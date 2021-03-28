+++
parent = "post.html"
date = 2021-03-16T21:15:00Z
comments = true
draft = true
title = "Nx, tailwindcss & Angular 11"
+++

I spent a solid 3 days going through countless medium articles, reddit posts & documentations looking for a way to get tailwind to play ball with this setup. The easy part is getting tailwind to actually be a part of the bundle, but the hard part was getting the purging, `@apply` & scss building to work correctly

## __1__ installing tailwind & webpack

```sh
npm install -D @tailwindcss/jit tailwindcss postcss webpack @angular-builders/custom-webpack --force
```

## __2__ create a `tailwind.scss` file

keep the tailwind styles separate from your actual `styles.scss` & add this to a file called `tailwind.scss` in the `src/` directory of your angular app

```
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

@layer base {
  p {
    @apply mb-3;
  }
}
```

## __3__ update nx workspace.json

set your `FRONTEND.targets.build.styles` to look like this, with `tailwind.scss` being the 1st element

```json
	"styles": [
		"apps/frontend/src/tailwind.scss",
		"apps/frontend/src/styles.scss",
	],
```

## __4__ create a `webpack.config.js` & `tailwind.config.js` file

```js
'use strict';
const webpack = require('webpack');

module.exports = {
  module: { 
    rules: [
      {
        test: /tailwind\.scss$/,
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            ident: 'postcss',
            syntax: 'postcss-scss',
            plugins: [
              require('postcss-import'),
              require('tailwindcss')(require('./tailwind.config.js')(false)),
              require('autoprefixer')
            ]
          }
        }
      },
      {
        test: /\.scss$/,
        loader: 'sass-loader'
      }
    ]
  },
  plugins: []
};
```

```js
// safelist array not currently supported, hack in a file with all safelisted classes
// for the tailwind/jit compiler to keep them in https://github.com/tailwindlabs/tailwindcss-jit/issues/32
module.exports = isProd => ({
  prefix: '',
  purge: {
    enabled: isProd,
    content: ['**/*.html', '**/*.ts', './apps/frontend/safelist.txt'],
    options: {
      safelist: []
    }
  },
  darkMode: false,
  theme: {},
  variants: {},
  plugins: []
});
```

For some reason I get a tonne of errors using `module.exports` as a function so I can't get the webpack env :/  
but setting the `false` to be a `true` isn't too difficult on the `isProd` argument of the tailwind config require when performing a prod build so whatever

## __5__ set angular to build using `custom-webpack` builder


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