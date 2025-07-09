import { Virtuoso } from "react-virtuoso";
import { cn } from "#/utils";
import { Item } from "#/list";
import type {
	ChemUIListConfigType,
	ChemUIListItemComponentMap,
	ChemUIListItemContentType,
	ChemUIListItemOptionsType,
	ChemUIListToolsType,
	ChemUIModuleItemType,
	ChemUITextItemType
} from "#/list/types";
import { ToolsList } from "#/list/components/tools";
import { TextItem } from "#/list/text-item.tsx";
import { useMemo } from "react";

export type ModuleType = {
	data: ChemUIModuleItemType;
	options?: ChemUIListItemOptionsType;
	customScrollParent?: HTMLElement;
	config?: ChemUIListConfigType;
	renderComponents?: ChemUIListItemComponentMap;
	toolsData?: ChemUIListToolsType;
};

type MergeListItem =
	| {
			type: "file";
			data: ChemUIListItemContentType;
	  }
	| {
			type: "text";
			data: ChemUITextItemType;
	  };
const Module = (props: ModuleType) => {
	const { data, options, customScrollParent, config, renderComponents, toolsData } = props;
	const { name, files = [], text = [] } = data;
	// const toolsRender = <ToolsList<ChemUIModuleItemType> toolsList={chemUIModuleTools} dataItem={data} />;
	const toolsRender = useMemo(() => {
		if (toolsData && toolsData?.moduleTools) {
			return <ToolsList<ChemUIModuleItemType> toolsList={toolsData?.moduleTools} dataItem={data} />;
		}
	}, [toolsData, toolsData?.moduleTools]);
	const mergeList: MergeListItem[] = useMemo(() => {
		return [
			...files.map(item => ({ type: "file", data: item }) as const),
			...text.map(item => ({ type: "text", data: item }) as const)
		];
	}, [files, text]);

	return (
		<>
			<div className="h-full">
				<div className="flex h-8 w-full items-center justify-between border-b border-blue-500">
					<span className="inline-block h-full rounded-sm bg-blue-500 px-4 py-1 text-base text-white">{name}</span>
					<div>{toolsRender}</div>
				</div>

				<Virtuoso
					customScrollParent={customScrollParent}
					data={mergeList}
					itemContent={(index, item) => {
						if (item.type === "file") {
							return (
								<div key={`${item.type}-${index}`} className={cn("py-4")}>
									<Item
										item={item.data}
										renderComponents={renderComponents}
										options={options}
										toolsList={toolsData?.itemTools}
										config={config}
									/>
								</div>
							);
						} else {
							return <div key={`text-list-${index}`}>{<TextItem data={item.data} toolsList={toolsData?.textItemTools} />}</div>;
						}
					}}
					style={{ height: "auto" }}
				/>
			</div>
		</>
	);
};

export { Module };
