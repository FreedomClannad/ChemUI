import type { ChemUIConfig, ChemUIListConfigType, ChemUIListItemComponentMap, ChemUIModuleItemType } from "#/list/types";
import { Module, type ModuleType } from "#/list/module.tsx";

type ListConfig<Config extends ChemUIConfig> = ChemUIListConfigType & Config;

type Props<Config extends ChemUIConfig> = Omit<ModuleType, "data"> & {
	dataSource: ChemUIModuleItemType[];
	config?: ListConfig<Config>;
	renderComponents?: ChemUIListItemComponentMap;
};

const List = <Config extends ChemUIConfig>(props: Props<Config>) => {
	const { dataSource } = props;

	return (
		<>
			{dataSource.map((item, index) => {
				return <Module key={`module-${index}`} {...props} data={item} />;
			})}
		</>
	);
};

export { List };
