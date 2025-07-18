import type { ChemUIConfig, ChemUIListConfigType, ChemUIModuleItemType, defaultChemUIConfig } from "#/list/types";
import { Module, type ModuleType } from "#/list/module.tsx";
import { useRef } from "react";

type ListConfig<Config extends ChemUIConfig> = ChemUIListConfigType & Config & defaultChemUIConfig;

type Props<Config extends ChemUIConfig> = Omit<ModuleType, "data"> & {
	dataSource: ChemUIModuleItemType[];
	config?: ListConfig<Config>;
};

const List = <Config extends ChemUIConfig>(props: Props<Config>) => {
	const { dataSource, customScrollParent } = props;
	const virtuosoRef = useRef<HTMLDivElement>(null);
	return (
		<div className="h-full overflow-y-auto" ref={virtuosoRef}>
			{dataSource.map((item, index) => {
				return (
					<Module
						key={`module-${index}`}
						{...props}
						customScrollParent={customScrollParent || (virtuosoRef.current as HTMLElement)}
						data={item}
					/>
				);
			})}
		</div>
	);
};

export { List };
