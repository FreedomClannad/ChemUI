import type { ChemUIModuleItemType } from "#/list/types";
import { Module, type ModuleType } from "#/list/module.tsx";

type Props = Omit<ModuleType, "data"> & {
	dataSource: ChemUIModuleItemType[];
};

const List = (props: Props) => {
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
