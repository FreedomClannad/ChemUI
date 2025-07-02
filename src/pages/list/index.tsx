import { type ChangeEvent, useMemo, useRef, useState } from "react";
import ReactJson from "react-json-view";
import { useDebounce } from "ahooks";
import { parseToObject } from "#/utils";
import useList from "#/list/hooks/use-list.ts";
import { List } from "#/list/list.tsx";
import type { ChemUIListItemType, ChemUIModuleItemType, ChemUITextItemType, ChemUIToolsItemType } from "#/list/types";
const ListPage = () => {
	const [textValue, setTextValue] = useState<string>("");
	const [textValueError, setTextValueError] = useState("");

	// 这里可以继续往外抛出，将这个值作为外部传导。
	const defaultToolsList: ChemUIToolsItemType<ChemUIListItemType>[] = [
		{
			icon: (item: ChemUIListItemType) => {
				if (!item.download_url) return;
				return (
					<div className="flex items-center">
						<div>下载</div>
						<span className="ml-1">download</span>
					</div>
				);
			},

			onClick: (item: ChemUIListItemType) => {
				// if (item.download_url) downloadFile(item.download_url, { useBlob: true, onError: (err: Error) => console.error(err) });
				console.log(item);
				console.log("下载");
			}
		},
		{
			icon: () => "测试按钮1",
			onClick: (item: ChemUIListItemType) => {
				console.log("下载2", item);
			}
		},
		{
			icon: () => "测试按钮2",
			onClick: (item: ChemUIListItemType) => {
				console.log("下载3", item);
			}
		},
		{
			icon: () => "测试按钮3",
			onClick: (item: ChemUIListItemType) => {
				console.log("下载4", item);
			}
		}
	];

	const defaultModuleToolsList: ChemUIToolsItemType<ChemUIModuleItemType>[] = [
		{
			icon: (item: ChemUIModuleItemType) => {
				if (!item.download_url) return;
				return (
					<div className="flex items-center">
						<div>下载</div>
					</div>
				);
			},

			onClick: (item: ChemUIModuleItemType) => {
				// if (item.download_url) downloadFile(item.download_url, { useBlob: true, onError: (err: Error) => console.error(err) });
				console.log(item);
				console.log("下载");
			}
		}
	];

	const defaultModuleTextToolsList: ChemUIToolsItemType<ChemUITextItemType>[] = [
		{
			icon: (item: ChemUITextItemType) => {
				if (!item.download_url) return;
				return (
					<div className="flex items-center">
						{/*<IconSVG name="DownloadIconPrimary" style={{ width: "14px", height: "14px" }} />*/}
						下载
					</div>
				);
			},

			onClick: (item: ChemUITextItemType) => {
				// if (item.download_url) downloadFile(item.download_url, { useBlob: true, onError: (err: Error) => console.error(err) });
				console.log(item);
				console.log("下载");
			}
		}
	];

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
	const { moduleItemList } = useList(result);
	const rootRef = useRef<HTMLDivElement>(null);
	return (
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
				<div>
					<List
						customScrollParent={rootRef.current as HTMLElement}
						dataSource={moduleItemList}
						chemUIModuleTools={defaultModuleToolsList}
						chemUIListTools={defaultToolsList}
						chemUITextListTools={defaultModuleTextToolsList}
					></List>
				</div>
			</div>
		</div>
	);
};

export default ListPage;
