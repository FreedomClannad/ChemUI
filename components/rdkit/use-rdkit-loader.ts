import { useEffect, useState } from "react";
import initRDKitModule, { type RDKitModule } from "@rdkit/rdkit";

interface RDKitLoaderOptions {
	locateFile?: (file: string) => string;
	onError?: (error: Error) => void;
	onLoad?: (module: RDKitModule) => void;
}

function useRDKitLoader(options: RDKitLoaderOptions = {}) {
	const { locateFile: userLocateFile, onError, onLoad } = options;
	const [rdKitModule, setRdKitModule] = useState<RDKitModule | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	// 智能路径生成器
	const getPossibleWasmPaths = (file: string) => {
		const paths = [];

		// 1. 基于构建工具特征的路径
		if (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_BASE_PATH) {
			// Next.js 应用
			paths.push(`${process.env.NEXT_PUBLIC_BASE_PATH}/_next/static/chunks/${file}`);
		}

		if (typeof import.meta.env?.VITE !== "undefined") {
			// Vite 应用
			paths.push(`/assets/${file}`);
			paths.push(`/${file}`);
		}

		// 2. 基于当前页面URL的路径
		if (typeof window !== "undefined") {
			const baseUrl = new URL(window.location.href);
			paths.push(new URL(file, baseUrl).href);
			paths.push(new URL(`assets/${file}`, baseUrl).href);
			paths.push(new URL(`static/${file}`, baseUrl).href);
		}

		// 3. 通用路径
		paths.push(`/${file}`, `/dist/${file}`, `/static/${file}`, `/assets/${file}`, `/node_modules/@rdkit/rdkit/dist/${file}`);

		return [...new Set(paths)]; // 去重
	};

	// 尝试加载资源并验证是否存在
	const probeResource = async (url: string) => {
		try {
			if (typeof window === "undefined") return false; // SSR环境跳过检测

			const response = await fetch(url, { method: "HEAD" });
			if (response.ok) return true;

			// 对于某些配置，可能需要尝试GET请求
			if (response.status === 403 || response.status === 405) {
				const getResponse = await fetch(url);
				return getResponse.ok;
			}
			return false;
		} catch {
			return false;
		}
	};

	const loadRDKit = async () => {
		const realInit = (initRDKitModule as any).default || initRDKitModule;

		// 用户自定义locateFile优先
		if (userLocateFile) {
			try {
				const module = await realInit({ locateFile: userLocateFile });
				return module;
			} catch (err) {
				console.warn("自定义 locateFile 失败，尝试自动检测", err);
				// 继续尝试自动检测
			}
		}

		// 智能检测流程
		const wasmFile = "RDKit_minimal.wasm"; // 或从模块中动态获取
		const possiblePaths = getPossibleWasmPaths(wasmFile);

		// 并行探测所有可能的路径
		const probingResults = await Promise.all(
			possiblePaths.map(async path => ({
				path,
				exists: await probeResource(path)
			}))
		);

		// 找到第一个存在的路径
		const validPath = probingResults.find(r => r.exists)?.path;

		if (!validPath) {
			throw new Error(`无法定位 RDKit WASM 文件，尝试了以下路径:\n${possiblePaths.join("\n")}`);
		}

		console.log(`使用 WASM 文件路径: ${validPath}`);
		return realInit({
			locateFile: (file: string) => (file.endsWith(".wasm") ? validPath.replace(wasmFile, file) : file)
		});
	};

	useEffect(() => {
		setIsLoading(true);
		setError(null);

		loadRDKit()
			.then(mod => {
				setRdKitModule(mod);
				setIsLoading(false);
				onLoad?.(mod);
			})
			.catch(err => {
				console.error("RDKit 加载失败", err);
				setError(err);
				setIsLoading(false);
				onError?.(err);
			});
	}, [userLocateFile]);

	return { rdKitModule, isLoading, error };
}

export { useRDKitLoader };
