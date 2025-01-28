import fs from 'fs';
import path from 'path';
import pluginHTMLCleanup from '../src/index';  // Adjust this import based on your actual file structure

jest.mock('fs');  // Mock fs module

describe('pluginHTMLCleanup', () => {
  const outDir = '/test-dir';

  beforeEach(() => {
    // Mock fs functions
    fs.readdirSync.mockReturnValue(['index.html']);
    fs.readFileSync.mockReturnValue(`
      <html>
        <head>
          <meta name="generator" content="Docusaurus v3.7.0">
          <meta name="docusaurus_version" content="current">
          <meta name="docusaurus_tag" content="docs-default-current">
          <meta name="docsearch:version" content="current">
          <meta name="docsearch:docusaurus_tag" content="docs-default-current">
          <link data-rh="true" rel="icon" href="/img/favicon.png">
          <title data-rh="true">Test Title</title>
        </head>
        <body>
          <div class="hello">Hello World!</div>
          <div class="">
            <a href="/" target="" title="Logo">
              <img src="logo.png" alt="" title="" />
            </a>
          </div>
        </body>
      </html>
    `);
    fs.writeFileSync.mockImplementation(() => { });  // Mock the writing functionality
  });

  test('should remove the generator meta tag', async () => {
    const options = {
      removeGeneratorTag: true,
      removeDocusaurusMetaTags: true,
      removeDocSearchMetaTags: true,
      removeDataRhTrue: true,
      removeEmptyAttributes: true,
    };

    await pluginHTMLCleanup({} as any, options).postBuild({ outDir });

    const outputHTML = fs.writeFileSync.mock.calls[0][1];

    expect(outputHTML).not.toContain('<meta name="generator" content="Docusaurus v3.7.0">');
  });

  test('should remove docusaurus meta tags', async () => {
    const options = {
      removeGeneratorTag: true,
      removeDocusaurusMetaTags: true,
      removeDocSearchMetaTags: true,
      removeDataRhTrue: true,
      removeEmptyAttributes: true,
    };

    await pluginHTMLCleanup({} as any, options).postBuild({ outDir });

    const outputHTML = fs.writeFileSync.mock.calls[0][1];

    expect(outputHTML).not.toContain('<meta name="docusaurus_version" content="current">');
    expect(outputHTML).not.toContain('<meta name="docusaurus_tag" content="docs-default-current">');
  });

  test('should remove data-rh="true" attributes', async () => {
    const options = {
      removeGeneratorTag: true,
      removeDocusaurusMetaTags: true,
      removeDocSearchMetaTags: true,
      removeDataRhTrue: true,
      removeEmptyAttributes: true,
    };

    await pluginHTMLCleanup({} as any, options).postBuild({ outDir });

    const outputHTML = fs.writeFileSync.mock.calls[0][1];

    expect(outputHTML).not.toContain('data-rh="true"');
  });

  test('should remove empty attributes like class, target, title, alt', async () => {
    const options = {
      removeGeneratorTag: true,
      removeDocusaurusMetaTags: true,
      removeDocSearchMetaTags: true,
      removeDataRhTrue: true,
      removeEmptyAttributes: true,
    };

    await pluginHTMLCleanup({} as any, options).postBuild({ outDir });

    const outputHTML = fs.writeFileSync.mock.calls[0][1];

    expect(outputHTML).not.toContain('class=""');
    expect(outputHTML).not.toContain('target=""');
    expect(outputHTML).not.toContain('title=""');
    expect(outputHTML).not.toContain('alt=""');
  });
});
