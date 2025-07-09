import { useMemo, useState } from "react";
import type { TableProps } from "antd";
import { Image, Table, message } from "antd";
import Papa from "papaparse";
import { imageNameRegex, imageRegex, smilesRegex } from "#/regex";
import type { ChemUIConfig, ChemUIListItemContentType, CSVConfigType } from "#/list/types";
import { fetchFileFromURL } from "#/utils";
import { useReadFile } from "#/list/hooks";
import { errorBase64 } from "#/img";
import { Smiles } from "#/smiles";
/**
 * 1. 远程读取文件流程
 * 2. 读取文件内容
 * 3. 解析文件内容
 * 4. 渲染文件内容
 */

type DataType = {
	[key: string]: string; // 动态键值类型，适应任意 CSV 结构
};
type CSVColumnsType = {
	key: string;
	title: string;
	dataIndex: string;
};

const CSV = (props: ChemUIListItemContentType) => {
	const { path, config } = props;
	const [dataSource, setDataSource] = useState<DataType[]>([]);
	const [columns, setColumns] = useState<TableProps<CSVColumnsType>["columns"]>([]);
	const configType = config as CSVConfigType;
	const PapaParse = (data: string) => {
		Papa.parse(data, {
			header: true,
			skipEmptyLines: true,
			complete: result => {
				const data = result.data as DataType[];
				if (data.length > 0) {
					const columnKeys = Object.keys(data[0] as Record<string, unknown>).filter(key => key !== "");
					// const new_columns: TableProps<CSVColumnsType>['columns'] = columnKeys.map(key => ({
					//   title: key,
					//   dataIndex: key,
					//   key,
					//   minWidth: 120,
					//   render: (text: string) => {
					//     if (imageRegex.test(text))
					//       return <Image height={150} src={text} />
					//     if (smilesRegex.test(key))
					//       return (<Smiles smiles={text} />)
					//
					//     return text
					//   },
					// }))
					const new_columns: TableProps<CSVColumnsType>["columns"] = [];
					columnKeys.forEach(key => {
						// 屏蔽表格标头的Img字段
						if (!imageNameRegex.test(key)) {
							if (smilesRegex.test(key)) {
								new_columns.push({
									title: `${key} Img`,
									dataIndex: key,
									key,
									minWidth: 120,
									render: (text: string) => {
										return <Smiles smiles={text} options={configType?.csv?.smilesOptions} />;
									}
								});
							}
							new_columns.push({
								title: key,
								dataIndex: key,
								key,
								minWidth: 120,
								render: (text: string) => {
									if (imageRegex.test(text)) return <Image height={150} src={text} fallback={errorBase64} />;
									return <span className="min-h-[60px]">{text}</span>;
								}
							});
						}
					});
					setColumns(new_columns);
					setDataSource(data);
				} else {
					message.warning("CSV 数据为空").then();
				}
			},
			error: () => message.error("数据解析失败")
		});
	};
	const validPath = useMemo(() => (typeof path === "string" ? path : ""), [path]);

	const processData = async () => {
		const data = await fetchFileFromURL(validPath);
		if (typeof data === "string") PapaParse(data);
	};
	useReadFile(validPath, processData);

	return (
		<div className="h-full w-full">
			<Table
				tableLayout="auto"
				dataSource={dataSource}
				columns={columns}
				pagination={{
					position: ["bottomCenter"]
				}}
				scroll={{
					x: "max-content",
					y: "600px"
				}}
			></Table>
		</div>
	);
};
export { CSV };
