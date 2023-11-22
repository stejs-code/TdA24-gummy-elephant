import {defineConfig} from "vite";
import {qwikVite} from "@builder.io/qwik/optimizer";
import {qwikCity} from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import run from "vite-plugin-run";

export default defineConfig(() => {
    return {
        plugins: [
            qwikCity({trailingSlash: false}),
            qwikVite(),
            tsconfigPaths(),
            run({
                silent: false,
                build: false,
                input: [
                    {
                        name: 'meilisearch-config',
                        run: ['node', 'meilisearch.config.mjs'],
                        pattern: ['./src/**/*.{ts,tsx}'],
                        delay: 1000,
                        build: false
                    }
                ]
            }),
        ],
        preview: {
            host: "0.0.0.0",
            headers: {
                "Cache-Control": "public, max-age=600",
            },
        },
    };
});
