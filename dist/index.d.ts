import type { LoadContext } from '@docusaurus/types';
import type { PluginOptions } from './options';
export default function pluginHTMLCleanup(context: LoadContext, options: PluginOptions): {
    name: string;
    postBuild({ outDir }: {
        outDir: string;
    }): Promise<void>;
};
