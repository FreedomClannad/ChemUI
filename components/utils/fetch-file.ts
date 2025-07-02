/**
 * 检查 URL 是否有效和是否包含http或https协议
 * @param url
 */
export const isValidURL = (url: string) => {
	try {
		const parsedUrl = new URL(url);
		return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
	} catch (error) {
		return false;
	}
};

/**
 * 使用 fetch 从 URL 获取文件内容
 * @param url
 */
export async function fetchFileFromURL(url: string): Promise<string | object | null> {
	console.log(url);
	try {
		const response = await fetch(url);
		console.log(response);
		if (!response.ok) throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);

		const contentType = response.headers.get("content-type") || "";
		console.log(contentType);
		if (contentType.includes("application/json")) {
			return await response.json();
		} else if (contentType.includes("text/csv")) {
			return await response.text();
		} else if (contentType.includes("application/pdf")) {
			const blob = await response.blob();
			return URL.createObjectURL(blob); // PDF 可用于 <embed> 标签
		} else if (contentType.includes("text/")) {
			return await response.text();
		} else if (contentType.includes("image/")) {
			const blob = await response.blob();
			return URL.createObjectURL(blob); // 图片处理
		} else if (contentType.includes("application/octet-stream")) {
			// 处理 application/octet-stream
			const arrayBuffer = await response.arrayBuffer();
			const decoder = new TextDecoder("utf-8"); // 假设内容是 UTF-8 编码的文本
			return decoder.decode(new Uint8Array(arrayBuffer));
			// return await response.text()
		} else if (contentType.includes("application/smil+xml") || contentType.includes("chemical/x-mdl-molfile")) {
			// 处理 application/octet-stream
			const arrayBuffer = await response.arrayBuffer();
			const decoder = new TextDecoder("utf-8"); // 假设内容是 UTF-8 编码的文本
			return decoder.decode(new Uint8Array(arrayBuffer));
			// return await response.text()
		} else {
			throw new Error("Unsupported file type");
		}
	} catch (error) {
		console.error("Error fetching file:", error);
		return null;
	}
}
