export * from "./fetch-file";
import { twMerge } from "tailwind-merge";
import cn from "classnames";
import { last } from "lodash-es";
import { v4 as uuidv4 } from "uuid";
import { nanoid } from "nanoid";
// 生成8位短唯一短id
export const getShortId = () => {
	return nanoid(8);
};

export const getUUID = () => {
	return uuidv4();
};

/**
 * 将svg转换为url
 * @param dom
 * @constructor
 */
export function SvgTransformUrl(dom: HTMLElement) {
	const svg = dom.querySelector("svg");

	if (!svg) return "";
	const clone_svg = svg.cloneNode(true) as SVGElement;
	clone_svg.setAttribute("style", "background-color: white;");
	const text = new XMLSerializer().serializeToString(clone_svg);
	const blob = new Blob([text], { type: "image/svg+xml" });
	return URL.createObjectURL(blob);
}

/**
 * 合并classname
 * @param cls
 * @constructor
 */
export const classNames = (...cls: cn.ArgumentArray) => {
	return twMerge(cn(cls));
};
export { classNames as cn };

export function getFileNameFromUrl(url: string): string {
	try {
		const parsedUrl = new URL(url);
		const searchParams = parsedUrl.searchParams;

		// 先检查参数中是否含有路径形式的值
		for (const [_, value] of searchParams.entries()) {
			const decoded = decodeURIComponent(value);

			// 如果是嵌套 http(s) 链接，递归提取
			if (/^https?:\/\//.test(decoded)) {
				const nestedResult = getFileNameFromUrl(decoded);
				if (nestedResult !== decoded) return nestedResult;
			}

			// 如果是类似路径的字段，例如 a/b/file.ext
			const pathLikeMatch = decoded.match(/\/?([^\/?#]+\.[a-zA-Z0-9]{2,5})$/);
			if (pathLikeMatch) return pathLikeMatch[1];
		}

		// 否则尝试直接从 pathname 中提取
		const path = parsedUrl.pathname;
		const lastPart = last(path.split("/")) ?? "";
		if (/\.[a-zA-Z0-9]{2,5}$/.test(lastPart)) return lastPart;

		return url;
	} catch {
		return url;
	}
}

export const parseToObject = <T>(value: string): string | T => {
	if (!value.trim()) return ""; // 处理空字符串
	let parsedObject: T | string = "";

	try {
		parsedObject = JSON.parse(value);
	} catch (error) {
		console.error(error);
		// JSON 解析失败，尝试按照对象格式解析
		try {
			parsedObject = eval(`(${value})`) as T;
			if (typeof parsedObject !== "object" || parsedObject === null) throw new Error("Not an object");
		} catch (error) {
			// 如果都无法解析，则返回 null 或者其他默认值
			console.error(error);
			parsedObject = "";
		}
	}

	return parsedObject;
};
