import type { CSSProperties } from "react";
import { useMemo } from "react";
import { Image } from "antd";
import { Card } from "./card";
import type { ChemUIListItemType } from "#/list/types";
const ImgBox = (props: ChemUIListItemType) => {
	const { path, contentHeight } = props;
	const rootStyleHeight: CSSProperties = useMemo(() => {
		if (!contentHeight) return {};
		if (typeof contentHeight === "string") {
			return {
				height: contentHeight
			};
		}
		return {
			height: `${contentHeight}px`
		};
	}, [contentHeight]);
	const maxHeight: CSSProperties = useMemo(() => {
		if (!contentHeight) return {};
		if (typeof contentHeight === "string") {
			return {
				maxHeight: contentHeight,
				height: contentHeight
			};
		}
		return {
			maxHeight: `${contentHeight}px`,
			height: `${contentHeight}px`
		};
	}, [contentHeight]);
	if (Array.isArray(path)) {
		return (
			<div className="flex flex-wrap justify-between gap-x-5 gap-y-3">
				{path.map((item, index) => (
					<Card key={`${item.name}-${index}`} {...item} />
				))}
			</div>
		);
	}

	return (
		<div className="w-full" style={rootStyleHeight}>
			<Image src={path} alt="image" style={maxHeight} />
		</div>
	);
};
export { ImgBox };
