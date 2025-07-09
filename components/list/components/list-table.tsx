import { useMemo, useState } from "react";
import type { ChemUIListItemContentType } from "#/list/types";
import { fetchFileFromURL } from "#/utils";
import { useReadFile } from "#/list/hooks";
import { isChemUIModuleArrayType } from "#/list/tools.ts";
import { isPlainObject } from "lodash-es";
import { MolstarTable } from "#/table";
import { Loading } from "#/loading";
const ListTable = (props: ChemUIListItemContentType) => {
	const { path } = props;
	const [content, setContent] = useState<any>("");
	const [error, setError] = useState<boolean>(false);
	const validPath = useMemo(() => (typeof path === "string" ? path : ""), [path]);
	const options = useMemo(() => {
		try {
			if (isPlainObject(content)) {
				const options = content as any;
				if (isChemUIModuleArrayType(options)) {
					console.log("这里是多数组的情况");
				} else {
					const { message } = options;
					if (message) return message;
					else return options;
				}
				return options;
			}
		} catch (e) {
			setError(true);
		}
		return undefined;
	}, [content]);
	const processData = async () => {
		const data = await fetchFileFromURL(validPath);
		setContent(data);
	};

	useReadFile(validPath, processData);
	if (error) return <div>出错了</div>;

	return (
		<>
			{options ? (
				<>
					<MolstarTable option={options} />
				</>
			) : (
				<div className="flex items-center justify-center">
					<Loading />
				</div>
			)}
		</>
	);
};

export { ListTable };
