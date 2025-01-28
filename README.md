# docusaurus-plugin-html-cleanup

## Overview

This plugin helps clean up the HTML files in a Docusaurus project. It removes unnecessary meta tags, such as the `generator` meta tag, `docusaurus_version` meta tag, `docusaurus_tag` meta tag, removes `data-rh="true"` attributes, and cleans up empty attributes (like `class`, `target`, `title`, `alt`) from the generated HTML files.

## Features

- **Remove Generator Tag**: By default, it removes the `generator` meta tag that Docusaurus inserts.
- **Remove Docusaurus Meta Tags**: Removes `docusaurus_version`, and `docusaurus_tag`, meta tags.
- **Remove DocSearch Meta Tags**: Removes `docsearch:version`, and `docsearch:docusaurus_tag` meta tags.
- **Remove `data-rh="true"`**: Removes the `data-rh="true"` attribute from `title`, `meta`, `link`, and `script` tags.
- **Remove Empty Attributes**: Cleans up empty attributes like `class`, `target`, `title`, and `alt`.

## Installation

To install this plugin, run:

```bash
npm install docusaurus-plugin-html-cleanup
```

## Usage

Once installed, add the plugin to the `docusaurus.config.js`:

```js
module.exports = {
  plugins: [
    [
      'docusaurus-plugin-html-cleanup',
      {
        removeGeneratorTag: true,
        removeDocusaurusMetaTags: true,
        removeDocSearchMetaTags: true,
        removeDataRhTrue: true,
        removeEmptyAttributes: true,
      },
    ],
  ],
};
```

## Options

You can configure the plugin using the following options:

- **removeGeneratorTag**: Removes the generator meta tag (default: true).
- **removeDocusaurusMetaTags**: Removes Docusaurus-related meta tags (default: true).
- **removeDocSearchMetaTags**: Removes Docsearch-related meta tags (default: true).
- **removeDataRhTrue**: Removes data-rh="true" from meta and link tags (default: true).
- **removeEmptyAttributes**: Removes empty attributes like class, target, title, and alt (default: true).

### Example

The following configuration will disable some functionality:

```js
module.exports = {
  plugins: [
    [
      'docusaurus-plugin-html-cleanup',
      {
        removeGeneratorTag: false, // Keep the generator tag
      },
    ],
  ],
};
```
