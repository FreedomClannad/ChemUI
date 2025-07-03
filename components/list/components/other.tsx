import type { ChemUIListItemContentType } from "#/list/types";
import { useMemo } from "react";
import { getFileNameFromUrl } from "#/utils";
import { type BaseTableItem, ListBaseTable } from "#/list";

const OtherComponent = (props: ChemUIListItemContentType) => {
	const { path } = props;
	const data: BaseTableItem[] = useMemo(() => {
		if (typeof path === "string") {
			return [
				{
					key: "1",
					value: getFileNameFromUrl(path)
				}
			];
		} else {
			if (Array.isArray(path)) {
				return path.map((item, index) => {
					return {
						key: index + 1,
						value: item.name || getFileNameFromUrl(item.path)
					} as unknown as BaseTableItem;
				});
			}
		}
		return [];
	}, [path]);
	return (
		<div>
			<ListBaseTable data={data} />
		</div>
	);
};
export { OtherComponent };
