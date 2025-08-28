import type { ChemUIConfig, ChemUIListConfigType, ChemUIModuleItemType, defaultChemUIConfig, ModuleRest } from "#/list/types";
import { Module } from "#/list/module1";
import { useMemo, useRef } from "react";
import { Virtuoso } from "react-virtuoso";
import { arrayTransform } from "#/list/tools.ts";
import { cn } from "#/utils";

type ListConfig<Config extends ChemUIConfig> = ChemUIListConfigType & Config & defaultChemUIConfig;

type Props<Config extends ChemUIConfig> = ModuleRest & {
	customScrollParent?: HTMLElement;
	dataSource: ChemUIModuleItemType[];
	config?: ListConfig<Config>;
};

const List = <Config extends ChemUIConfig>(props: Props<Config>) => {
	const { dataSource, customScrollParent } = props;
	const virtuosoRef = useRef<HTMLDivElement | null>(null);
	// 这里使用hook针对dataSource进行处理
	const data = useMemo(() => {
		return arrayTransform(dataSource);
	}, [dataSource]);
	return (
		<div className={cn("h-full", !customScrollParent && "overflow-y-auto")} ref={virtuosoRef}>
			<Virtuoso
				customScrollParent={customScrollParent || virtuosoRef.current || undefined}
				data={data}
				itemContent={(_index, item) => {
					return <Module {...props} {...item} />;
				}}
			/>
		</div>
	);
};

export { List };
