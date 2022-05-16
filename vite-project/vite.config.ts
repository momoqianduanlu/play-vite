import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { normalizePath } from "vite";
import autoprefixer from "autoprefixer";
import viteEslint from "vite-plugin-eslint";
import viteStylelint from "@amatlash/vite-plugin-stylelint";

const path = require("path");
const variablePath = normalizePath(
  path.resolve(__dirname, "./src/variable.scss")
);

// https://vitejs.dev/config/
export default defineConfig({
  // css相关的配置
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
    // 进行 PostCSS 配置
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ["Chrome > 40", "ff > 31", "ie 11"],
        }),
      ],
    },
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`,
      },
    },
  },
  // 手动指定项目根目录位置
  root: path.join(__dirname, "src"),
  plugins: [
    react(),
    viteEslint(),
    viteStylelint({
      // 对某些文件排除检查
      exclude: /windicss|node_modules/,
    }),
  ],
});
