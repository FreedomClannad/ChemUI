import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { codeInspectorPlugin } from "code-inspector-plugin";
// import path from "path";
const externalPackages = ["react", "react/jsx-runtime", "ketcher-core", "ketcher-react", "antd", "molstar", "chem2dview"];
function isExternal(id: string) {
	return externalPackages.some(pkg => id === pkg || id.startsWith(pkg + "/"));
}
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
		publicDir: "public", // 默认值，写出来确保没问题
		resolve: {
			alias: {
				"#": resolve(__dirname, "./components"),
				"@": resolve(__dirname, "./src")
			}
		},
		plugins: [
			react(),
			dts({ include: ["components"], tsconfigPath: "./tsconfig.build.json" }),
			codeInspectorPlugin({
				bundler: "vite"
			})
		],
		server: {
			proxy: {
				"/v2": {
					target: "http://192.168.101.201:13001/",
					changeOrigin: true
				}
			}
		},

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
				external: isExternal,
				output: {
					manualChunks: (id: string) => {
						if (id.includes("node_modules")) {
							return "vendor";
						}
						// const segments = id.split(path.sep);
						// const nmIndex = segments.lastIndexOf("node_modules");
						// if (nmIndex >= 0 && segments.length > nmIndex + 1) {
						// 	// 获取包名（支持 scoped package @scope/name）
						// 	let pkgName = segments[nmIndex + 1];
						// 	if (pkgName.startsWith("@") && segments.length > nmIndex + 2) {
						// 		pkgName = `${pkgName}_${segments[nmIndex + 2]}`;
						// 	}
						// 	return `vendor-${pkgName}`;
						// }
					},
					assetFileNames: assetInfo => {
						if (assetInfo.name?.endsWith(".css")) {
							return "index.css"; // 所有 CSS 合并为 styles.css
						}
						return "assets/[name].[ext]";
					},
					preserveModules: false
				}
			}
		}
	};
});
