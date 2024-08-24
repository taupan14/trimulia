import { defineConfig } from "vite";
import path from "path";
import fs from "fs";

function getHtmlEntries() {
    const files = fs.readdirSync("./").filter((file) => file.endsWith(".html"));
    const entries = {};
    files.forEach((file) => {
        const name = path.basename(file, ".html");
        entries[name] = `./${file}`;
    });
    return entries;
}

export default defineConfig({
    base: "./",
    build: {
        outDir: "design",
        emptyOutDir: true,
        chunkSizeWarningLimit: 2000,
        rollupOptions: {
            input: getHtmlEntries(),
            output: {
                preserveModules: false,
                assetFileNames: (assetInfo) => {
                    let extType = assetInfo.name.split(".").at(1);
                    if (/png|jpe?g|svg|gif|tiff|bmp|mp4|ico/i.test(extType)) {
                        extType = "images";
                    }
                    if (/woff|woff2|ttf|eot/i.test(extType)) {
                        extType = "fonts";
                    }
                    return `assets/${extType}/[name][extname]`
                },
                chunkFileNames: "assets/js/[name].js",
                entryFileNames: "assets/js/[name].js",
            },
        },
    },
    resolve: {
        alias: {
            "@css": path.resolve(__dirname, "assets/css/"),
            "@fonts": path.resolve(__dirname, "assets/fonts/"),
            "@js": path.resolve(__dirname, "assets/js/"),
        },
    },
});