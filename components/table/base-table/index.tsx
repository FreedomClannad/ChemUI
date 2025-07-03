import React, { useEffect, useMemo, useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import "./style.css";
import type { TableColumnsStateType, TableOptions } from "#/table/types";
import { useTableColumnsState } from "#/table/hooks/use-table-columns-state.ts";
import { TableColumnsContext } from "../context";
type TableRowSelection<T extends object = object> = TableProps<T>["rowSelection"];

type Props<T> = {
	columns: TableColumnsType<T>;
	dataSource: T[];
	tableColumnsStateList?: TableColumnsStateType[];
	options?: TableOptions;
	onSelectChange?: (select: React.Key[]) => void;
	scroll?: {
		x?: string | number | true | undefined;
		y?: string | number | undefined;
	};
};

const BaseTable = <T extends object>(props: Props<T>) => {
	const { columns, dataSource, tableColumnsStateList, options, onSelectChange, scroll = { x: true } } = props;
	const tableColumnsState = useTableColumnsState(tableColumnsStateList);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	useEffect(() => {
		onSelectChange?.(selectedRowKeys);
	}, [selectedRowKeys]);
	const onRowSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const rowSelectionMemo: TableRowSelection<T> | undefined = useMemo(() => {
		if (options) {
			const { rowSelection } = options;
			if (rowSelection) {
				return {
					selectedRowKeys,
					onChange: onRowSelectChange
				};
			}
		}

		return undefined;
	}, [options, selectedRowKeys]);
	return (
		<TableColumnsContext.Provider value={tableColumnsState}>
			<Table<T>
				className="chem-ui-base-table"
				rowSelection={rowSelectionMemo}
				columns={columns}
				dataSource={dataSource}
				pagination={false}
				scroll={scroll}
			/>
		</TableColumnsContext.Provider>
	);
};

export default BaseTable;
