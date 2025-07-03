import { useEffect, useMemo, useRef, useState } from "react";
import type { TableColumnsType } from "antd";
import { v4 as uuid4 } from "uuid";
import { formatterTable } from "#/table/utils";
import type { TableColumnsStateType, TableDataType, TableType } from "#/table/types";
type BaseListItem = {
	key: string;
	label: string;
	columns: TableColumnsType<TableDataType>;
	dataSource: TableDataType[];
	tableColumnsStateList: TableColumnsStateType[];
};
const useListHooks = (baseTableList: TableType[]) => {
	const [baseListItems, setBaseListItems] = useState<BaseListItem[]>([]);
	const tableRootRef = useRef<HTMLDivElement>(null);
	const scroll = useMemo(() => {
		return {
			y: (tableRootRef.current?.clientHeight || 500) - 55,
			x: "max-content"
		};
	}, [baseListItems, tableRootRef]);

	useEffect(() => {
		if (baseTableList.length === 0) {
			setBaseListItems([]);
		} else {
			const list = baseTableList.map(item => {
				const data = formatterTable<TableDataType>(item);
				return {
					key: uuid4(),
					label: item.name || "",
					...data
				} as BaseListItem;
			});
			setBaseListItems(list);
		}
	}, [baseTableList]);
	return { baseListItems, tableRootRef, scroll };
};
export { useListHooks };
