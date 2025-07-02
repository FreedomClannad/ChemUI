import type { ChemUIListItemContentType } from "#/list/types";
import { BaseTable, type BaseTableItem } from "#/list/components/base-table.tsx";
import { useMemo } from "react";
import { getFileNameFromUrl } from "#/utils";

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
			<BaseTable data={data} />
		</div>
	);
};
export { OtherComponent };
