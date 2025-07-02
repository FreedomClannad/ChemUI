import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
const nodeEnv = process.env.NODE_ENV === "production" ? '"production"' : '"development"';
export default defineConfig(() => {
	const define = {
		global: {},
		"process.env": process.env,
		"process.env.NODE_ENV": nodeEnv
	};
	return {
		define,
		resolve: {
			alias: {
				"#": resolve(__dirname, "./components"),
				"@": resolve(__dirname, "./src")
			}
		},
		plugins: [react(), dts({ include: ["components"], tsconfigPath: "./tsconfig.build.json" })],
		server: {
			proxy: {
				"/v2": {
					target: "http://192.168.101.201:13001/",
					changeOrigin: true
				}
			}
		},
		// css: {
		// 	postcss: "./postcss.config.cjs"
		// },
		build: {
			cssCodeSplit: false, // 禁用 CSS 代码分割
			copyPublicDir: false,
			lib: {
				// Could also be a dictionary or array of multiple entry points
				entry: resolve(__dirname, "components/index.ts"),
				fileName: "index",
				formats: ["es"]
			},
			rollupOptions: {
				// 确保外部化处理那些你不想打包进库的依赖
				external: ["react", "react/jsx-runtime", "ketcher-core", "ketcher-react"],
				output: {
					manualChunks: (id: string) => {
						if (id.includes("node_modules")) {
							return "vendor";
						}
					},
					assetFileNames: assetInfo => {
						if (assetInfo.name?.endsWith(".css")) {
							return "styles.css"; // 所有 CSS 合并为 styles.css
						}
						return "assets/[name].[ext]";
					}
				}
			}
		}
	};
});
