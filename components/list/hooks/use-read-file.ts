import { useEffect } from "react";
import { message } from "antd";
import { isValidURL } from "#/utils";
const useReadFile = (path: string, onFileRead: () => void) => {
	const readFile = async () => {
		if (isValidURL(path)) onFileRead();
		else message.error("不是有效的URL");
	};
	useEffect(() => {
		if (path) {
			readFile().then();
		}
	}, [path]);
	return {
		readFile
	};
};
export { useReadFile };
