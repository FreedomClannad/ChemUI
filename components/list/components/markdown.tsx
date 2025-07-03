import { useMemo, useState } from "react";
import { Markdown as MarkdownComp } from "#/markdown";
import type { ChemUIListItemContentType } from "#/list/types";
import { fetchFileFromURL } from "#/utils";
import { useReadFile } from "#/list/hooks";

const Markdown = (props: ChemUIListItemContentType) => {
	const { path } = props;
	const [content, setContent] = useState<string>("");
	const validPath = useMemo(() => (typeof path === "string" ? path : ""), [path]);
	const processData = async () => {
		const data = await fetchFileFromURL(validPath);
		if (typeof data === "string") setContent(data);
	};

	useReadFile(validPath, processData);

	return (
		<div>
			<MarkdownComp content={content} />
		</div>
	);
};
export { Markdown };
