import { useMemo, useState } from "react";
import { Text } from "#/text";
import type { ChemUIListItemType } from "#/list/types";
import { fetchFileFromURL } from "#/utils";
import { useReadFile } from "#/list/hooks/use-read-file.ts";

const TextBox = (props: ChemUIListItemType) => {
	const { path } = props;
	const [result, setResult] = useState<string>("");
	const validPath = useMemo(() => (typeof path === "string" ? path : ""), [path]);
	const processData = async () => {
		const data = await fetchFileFromURL(validPath);
		if (typeof data === "string") setResult(data);
	};
	useReadFile(validPath, processData);
	return <Text result={result} />;
};

export { TextBox };
