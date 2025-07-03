import type { TableColumnsType } from "antd";
import type { AlignType } from "rc-table/lib/interface";
import { getUUID } from "#/utils";
import { TableHeaderTypeEnum } from "#/table/types";
import type { TableColumnsStateType, TableType, TableHeaderType } from "#/table/types";
import { TableColumnsBox, TableHeaderTooltipBox } from "#/table/components";

// TODO 这里不应该这样弄，地址应该是拼接好的，而不是我这边拼接
export const getFile = ({ name, query }: { name: string; query: any }) => {
	const keys = Object.keys(query);
	const values = keys.map(key => `${key}=${query[key]}`);
	return `${process.env.NEXT_PUBLIC_API_PREFIX}/files/utility/${name}?${values.join("&")}`;
};

export const formatterColumns = <DataType>(tableHeaderList: TableHeaderType[]): TableColumnsType<DataType> => {
	if (tableHeaderList.length === 0) return [];
	return tableHeaderList.map(item => {
		const obj = {
			title: TableHeaderTooltipBox(item.title, item.tooltip || "", item.align || "left"),
			dataIndex: item.key,
			align: item.align || "left"
		};
		if (Object.keys(TableColumnsBox).includes(item.type)) obj.render = TableColumnsBox[item.type as keyof typeof TableColumnsBox];
		return {
			...obj
		};
	});
};

export const formatterData = <DataType extends Record<string, any>>(
	table: TableType
): { dataSource: DataType[]; tableColumnsStateList: TableColumnsStateType[] } => {
	const dataSource: DataType[] = [];
	const { data, header } = table;
	// const { rowSelectionKey } = options
	const tableColumnsStateList: TableColumnsStateType[] = [];
	try {
		data.forEach(item => {
			const key = getUUID();
			const new_data: DataType = { key, ...item };
			const new_table_render_columns: TableColumnsStateType = {
				key,
				molstarOpen: false
			};
			header.forEach(headerItem => {
				if (headerItem.type === TableHeaderTypeEnum.IMG) {
					const url = item[headerItem.key];
					if (typeof url === "string") {
						const new_url = url || "";
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-expect-error
						new_data[headerItem.key] = new_url;
					} else {
						const { file_id, file_name } = item[headerItem.key];
						if (file_id && file_name)
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-expect-error
							// TODO这里应该要优化，不应该有对象形式
							new_data[headerItem.key] = getFile({
								name: file_name,
								query: { file_id, preview_type: "stream", source: "result" }
							});
					}
				}
				if (headerItem.type === TableHeaderTypeEnum.MOLSTAR) {
					// 这里预留后面针对不同的内容进行修改
				}
			});
			dataSource.push(new_data);
			tableColumnsStateList.push(new_table_render_columns);
		});
	} catch (error) {
		console.error(error);
	}

	return {
		dataSource,
		tableColumnsStateList
	};
};

export const formatterTable = <T extends Record<string, any>>(
	table: TableType
): { dataSource: T[]; columns: TableColumnsType<T>; tableColumnsStateList: TableColumnsStateType[] } => {
	const columns = formatterColumns<T>(table.header);
	const data = formatterData<T>(table);
	return {
		columns,
		...data
	};
};

export const formatterAlign = (align: AlignType): string => {
	switch (align) {
		case "left":
			return "justify-start";
		case "center":
			return "justify-center";
		case "right":
			return "justify-end";
		default:
			return "justify-start";
	}
};
