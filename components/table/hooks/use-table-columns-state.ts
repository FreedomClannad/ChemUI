import { useEffect, useState } from "react";
import type { TableColumnsStateType } from "#/table/types";
export type useTableColumnsStateType = ReturnType<typeof useTableColumnsState>;
const useTableColumnsState = (columns: TableColumnsStateType[] | undefined) => {
	const [columnsStateList, setColumnsStateList] = useState<TableColumnsStateType[]>([]);
	useEffect(() => {
		if (columns) setColumnsStateList(columns);
	}, [columns]);
	const getColumnsState = (key: string) => {
		return columnsStateList.find(item => item.key === key);
	};
	const setColumnsState = (columnsState: TableColumnsStateType) => {
		setColumnsStateList(columnsStateList.map(item => (item.key === columnsState.key ? columnsState : item)));
	};
	return { columnsStateList, getColumnsState, setColumnsState };
};
export { useTableColumnsState };
