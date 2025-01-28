"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = pluginHTMLCleanup;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function pluginHTMLCleanup(context, options) {
    const { removeGeneratorTag = true, removeDocusaurusMetaTags = true, removeDocSearchMetaTags = true, removeDataRhTrue = true, removeEmptyAttributes = true, } = options;
    return {
        name: 'docusaurus-plugin-html-cleanup',
        async postBuild({ outDir }) {
            const files = fs_1.default.readdirSync(outDir);
            files.forEach((file) => {
                if (file.endsWith('.html')) {
                    const filePath = path_1.default.join(outDir, file);
                    let htmlContent = fs_1.default.readFileSync(filePath, 'utf-8');
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
                    fs_1.default.writeFileSync(filePath, htmlContent);
                }
            });
        },
    };
}
;
