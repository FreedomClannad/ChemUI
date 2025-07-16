import { type ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import ReactJson from "react-json-view";
import { useDebounce } from "ahooks";
import { parseToObject } from "#/utils";
import { useListHook } from "#/list/hooks/use-list";
import { List } from "#/list/list";
import type { ChemUIListItemType, ChemUIModuleItemType, ChemUITextItemType, CSVConfigType } from "#/list/types";
import {
	Demo2D,
	Demo3D,
	Demo3DPreview,
	Demo3DSEQ,
	DemoCSV,
	DemoCSVSmiles,
	DemoMultipleList,
	DemoMarkdown,
	DemoSingleImg,
	DemoTable,
	DemoText
} from "@/pages/list/demo";
import { defaultDownloadTools } from "#/list/default";
type MyConfig = {
	test: string;
} & CSVConfigType;
const ListPage = () => {
	const [textValue, setTextValue] = useState<string>("");
	const [textValueError, setTextValueError] = useState("");
	const defaultItemTool = defaultDownloadTools<ChemUIListItemType>();
	const defaultModuleTool = defaultDownloadTools<ChemUIModuleItemType>();
	const defaultTextTool = defaultDownloadTools<ChemUITextItemType>();
	const [moduleItemList, setModuleItemList] = useState<ChemUIModuleItemType[]>([]);
	const { renderComponents, parseJSONList } = useListHook();
	const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setTextValue(e.target.value);
	};
	const debouncedValue = useDebounce(textValue, {
		wait: 1000
	});
	const json_value = useMemo(() => {
		try {
			if (textValueError) setTextValueError("");

			if (textValue) return parseToObject<never>(textValue);

			return "";
		} catch (e) {
			console.log(e);
			setTextValueError("无法转换成JSON格式,请检查JSON内容");
		}
		return "";
	}, [debouncedValue]);
	const result = useMemo(() => {
		return JSON.stringify(json_value);
	}, [json_value]);
	useEffect(() => {
		setModuleItemList(parseJSONList(result));
	}, [result]);
	useEffect(() => {
		setTextValue(JSON.stringify(DemoCSV));
	}, []);

	const rootRef = useRef<HTMLDivElement>(null);
	return (
		<div className="h-[100vh]">
			<div className="h-full overflow-y-auto px-10" ref={rootRef}>
				<div>输入内容</div>
				<div className="mt-2 flex h-[400px] w-full gap-10">
					<div className="w-1/2">
						<textarea
							className="h-full max-h-[400px] w-full resize-none"
							value={textValue}
							onChange={handleTextAreaChange}
							placeholder="请输入JSON内容"
							autoCapitalize="off"
						></textarea>
					</div>
					<div className="max-h-[380px] w-1/2 overflow-y-auto">
						{json_value ? <ReactJson name={false} src={json_value} onChange={handleTextAreaChange} /> : <div>可视化</div>}
					</div>
				</div>
				<div>
					<div className="text-lg text-gray-900">可视化</div>
					<div className="h-[500px]">
						<List<MyConfig>
							// customScrollParent={rootRef.current as HTMLElement}
							dataSource={moduleItemList}
							toolsData={{
								moduleTools: defaultModuleTool,
								itemTools: defaultItemTool,
								textItemTools: defaultTextTool
							}}
							renderComponents={renderComponents}
							config={{
								test: "1232",
								csv: {
									smilesOptions: {
										locateFile: (file: string) => {
											return `/${file}`;
										}
									}
								}
							}}
						></List>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListPage;
