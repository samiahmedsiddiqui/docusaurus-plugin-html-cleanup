import fs from 'fs';
import path from 'path';
import type { LoadContext } from '@docusaurus/types';
import type { PluginOptions } from './options';

export default function pluginHTMLCleanup (context: LoadContext, options: PluginOptions) {
  const {
    removeGeneratorTag = true,
    removeDocusaurusMetaTags = true,
    removeDocSearchMetaTags = true,
    removeDataRhTrue = true,
    removeEmptyAttributes = true,
  } = options;

  return {
    name: 'docusaurus-plugin-html-cleanup',

    async postBuild ({ outDir }: { outDir: string }) {
      const files = fs.readdirSync(outDir);

      files.forEach((file) => {
        if (file.endsWith('.html')) {
          const filePath = path.join(outDir, file);

          let htmlContent = fs.readFileSync(filePath, 'utf-8');

          // Remove generator meta tag if needed.
          if (removeGeneratorTag) {
            htmlContent = htmlContent.replace(/<meta[^>]*name="generator"[^>]*>/gi, '');
          }

          // Remove docusaurus meta tags if needed.
          if (removeDocusaurusMetaTags) {
            htmlContent = htmlContent.replace(/<meta[^>]*name="docusaurus_version"[^>]*>/gi, '');
            htmlContent = htmlContent.replace(/<meta[^>]*name="docusaurus_tag"[^>]*>/gi, '');
          }

          // Remove docsearch meta tags if needed.
          if (removeDocSearchMetaTags) {
            htmlContent = htmlContent.replace(/<meta[^>]*name="docsearch:version"[^>]*>/gi, '');
            htmlContent = htmlContent.replace(/<meta[^>]*name="docsearch:docusaurus_tag"[^>]*>/gi, '');
          }

          // Remove data-rh="true" attribute if needed.
          if (removeDataRhTrue) {
            htmlContent = htmlContent.replace(/<meta[^>]*data-rh="true"[^>]*>/gi, '');
            htmlContent = htmlContent.replace(/<link[^>]*data-rh="true"[^>]*>/gi, '');
            htmlContent = htmlContent.replace(/<title[^>]*data-rh="true"[^>]*>/gi, '<title>');
            htmlContent = htmlContent.replace(/<script[^>]*data-rh="true"[^>]*>/gi, '<script>');
          }

          // Remove empty attributes like class, target, title, alt if needed
          if (removeEmptyAttributes) {
            htmlContent = htmlContent.replace(/\s(class|target|title|alt)="\s*"/g, '');
          }

          htmlContent = htmlContent.replace(/^\s*[\r\n]/gm, '');
          htmlContent = htmlContent.trim();

          fs.writeFileSync(filePath, htmlContent);
        }
      });
    },
  };
};
