import { ToolsIcon } from "./icon";
import type { ChemUIToolsItemType } from "#/list/types";
type Props<T> = {
	toolsList: ChemUIToolsItemType<T>[];
	dataItem: T;
};

export const ToolsList = <T extends object>(props: Props<T>) => {
	const { toolsList, dataItem } = props;
	return (
		<div className="flex items-center">
			{toolsList.map((item, index) => (
				<div className="ml-1.5 flex items-center first:ml-0" key={index}>
					<ToolsIcon
						icon={item.icon(dataItem)}
						onClick={() => {
							item.onClick(dataItem);
						}}
					></ToolsIcon>
				</div>
			))}
		</div>
	);
};
