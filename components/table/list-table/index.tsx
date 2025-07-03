import { cn } from "#/utils";
import BaseTable from "#/table/base-table";
import { useListHooks } from "#/table/hooks/use-list-hooks.ts";
import type { TableDataType, TableType } from "#/table/types";
type Props = {
	series: TableType[];
};
const ListTable = ({ series }: Props) => {
	const { baseListItems, scroll, tableRootRef } = useListHooks(series);
	return (
		<div className="h-full" ref={tableRootRef}>
			{baseListItems.map((item, index) => {
				return (
					<div key={item.key} className={cn(index === 0 && "h-full", index > 0 && "mt-8", "w-full")}>
						{item.label && <div className="mb-3 flex items-center justify-center text-xl font-semibold">{item.label}</div>}
						<BaseTable<TableDataType>
							tableColumnsStateList={item.tableColumnsStateList}
							columns={item.columns}
							dataSource={item.dataSource}
							scroll={scroll}
						/>
					</div>
				);
			})}
		</div>
	);
};

export { ListTable };
