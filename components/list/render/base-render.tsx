// baseRenderers.tsx
import { createRenderers } from "../tools";
import { Item, ToolsList } from "#/list";
import { TextItem } from "#/list/text-item.tsx";
import { cn } from "#/utils";
import { useMemo } from "react";
import type { ChemUIModuleItemType } from "#";

/** 基础内置类型的渲染器集合 */
export const baseRenderers = createRenderers(register => {
	register("file", props => {
		const { data, renderOptions, renderComponents, toolsData, config } = props;
		return (
			<div className={cn("py-4")}>
				<Item
					item={data}
					renderComponents={renderComponents}
					renderOptions={renderOptions}
					toolsList={toolsData?.itemTools}
					config={config}
				/>
			</div>
		);
	});

	register("text", props => {
		const { data, toolsData } = props;
		return <TextItem data={data} toolsList={toolsData?.textItemTools} />;
	});

	register("header", props => {
		const { data, toolsData } = props;
		const { name } = data;
		const toolsRender = useMemo(() => {
			if (toolsData && toolsData?.moduleTools) {
				return <ToolsList<ChemUIModuleItemType> toolsList={toolsData?.moduleTools} dataItem={data} />;
			}
		}, [toolsData]);
		return (
			<div className="flex h-8 w-full items-center justify-between border-b border-blue-500">
				<span className="inline-block h-full rounded-sm bg-blue-500 px-4 py-1 text-base text-white">{name}</span>
				<div>{toolsRender}</div>
			</div>
		);
	});
});
