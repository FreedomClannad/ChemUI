import type { ChemUIConfig, ChemUIListConfigType, ChemUIModuleItemType } from "#/list/types";
import { Module, type ModuleType } from "#/list/module.tsx";

type ListConfig<Config extends ChemUIConfig> = ChemUIListConfigType & Config;

type Props<Config extends ChemUIConfig> = Omit<ModuleType, "data"> & {
	dataSource: ChemUIModuleItemType[];
	config?: ListConfig<Config>;
};

const List = <Config extends ChemUIConfig>(props: Props<Config>) => {
	const { dataSource, config } = props;

	return (
		<>
			{dataSource.map((item, index) => {
				return <Module key={`module-${index}`} {...props} data={item} config={config} />;
			})}
		</>
	);
};

export { List };
