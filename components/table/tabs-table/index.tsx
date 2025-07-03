import { Tabs } from "antd";
import type { TableType } from "#/table/types";
import { useTabsTableHooks } from "#/table/hooks/use-tabs-table-hooks.tsx";
type Props = {
	series: TableType[];
};
const TabsTable = ({ series }: Props) => {
	const { tabItems, tabsRootRef } = useTabsTableHooks(series);
	return (
		<div ref={tabsRootRef} className="h-full">
			<Tabs items={tabItems} className="h-full" />
		</div>
	);
};

export { TabsTable };
