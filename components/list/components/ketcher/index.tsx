import { useEffect, useMemo } from "react";
import { message } from "antd";
import { cn, fetchFileFromURL, isValidURL } from "#/utils";
import "./ketcher.css";
import type { ChemUIListItemType } from "#/list/types";
import { KetcherEdit, useKetcherEditHook } from "chem2dview";
import "ketcher-react/dist/index.css";
const Ketcher = (props: ChemUIListItemType) => {
	const { path, format, contentHeight } = props;
	const { KetcherRef } = useKetcherEditHook();
	const rendFile = async () => {
		if (typeof path === "string" && isValidURL(path)) {
			const data = await fetchFileFromURL(path);
			if (typeof data === "string") {
				setTimeout(() => {
					KetcherRef.current?.setMolecule(data);
				}, 3000);
			}
		} else {
			message.error("不是有效的URL").then();
		}
	};
	const rootHeight = useMemo(() => {
		if (!contentHeight) return "800px";
		if (typeof contentHeight === "number") return `${contentHeight}px`;
		return contentHeight;
	}, [contentHeight]);
	useEffect(() => {
		if (path) {
			rendFile().then();
		}
	}, [path]);
	return (
		<div className={cn("chem-ui-list-ketcer-body")} style={{ height: rootHeight }}>
			<KetcherEdit ref={KetcherRef} staticResourcesUrl={"./"} />
		</div>
	);
};

export { Ketcher };
