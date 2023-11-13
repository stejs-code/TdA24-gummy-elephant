import {defineConfig} from "vite";
import {qwikVite} from "@builder.io/qwik/optimizer";
import {qwikCity} from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
    return {
        plugins: [
            qwikCity({trailingSlash: false}),
            qwikVite(),
            tsconfigPaths()
        ],
        preview: {
            host: "0.0.0.0",
            headers: {
                "Cache-Control": "public, max-age=600",
            },
        },
    };
});
