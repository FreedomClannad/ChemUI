import type { TabsProps } from "antd";
import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import type { TableDataType, TableType } from "#/table/types";
import { formatterTable } from "#/table/utils";
import BaseTable from "#/table/base-table";
type TabsTableThrown = {
	tabItems: TabsProps["items"];
	tabsRootRef: RefObject<HTMLDivElement | null>;
};
export const useTabsTableHooks = (tabsTableList: TableType[]): TabsTableThrown => {
	const [tabItems, setTabItems] = useState<TabsProps["items"]>();
	const tabsRootRef = useRef<HTMLDivElement | null>(null);
	const [tableContentHeight, setTableContentHeight] = useState<string | number | undefined>(undefined);
	const [tableContentWidth, setTableContentWidth] = useState<string | number | undefined>(undefined);
	const contentHeight = () => {
		const antTabsElement = tabsRootRef.current?.querySelector<HTMLElement>(".ant-tabs-content-holder");
		if (antTabsElement) {
			const tableHeader = tabsRootRef.current?.querySelector<HTMLDivElement>(".ant-table-thead");
			if (antTabsElement.offsetHeight > 0) {
				if (tableHeader) setTableContentHeight(antTabsElement.offsetHeight - tableHeader.offsetHeight - 10);
				else setTableContentHeight(antTabsElement.offsetHeight - 55 - 10);
			}
			setTableContentWidth(antTabsElement.offsetWidth);
		}
	};
	useEffect(() => {
		contentHeight();
	}, []);
	useEffect(() => {
		if (tabsTableList.length === 0) {
			setTabItems([]);
		} else {
			const list = tabsTableList.map(item => {
				const { columns, dataSource, tableColumnsStateList } = formatterTable<TableDataType>(item);
				return {
					label: item.name,
					key: item.name,
					children: (
						<BaseTable<TableDataType>
							tableColumnsStateList={tableColumnsStateList}
							columns={columns}
							dataSource={dataSource}
							scroll={{ y: tableContentHeight, x: tableContentWidth }}
						/>
					)
				};
			});
			setTabItems(list);
		}
	}, [tabsTableList, tableContentHeight, tableContentWidth]);
	return {
		tabItems,
		tabsRootRef
	};
};
