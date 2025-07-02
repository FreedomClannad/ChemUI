import { useMemo } from "react";
import {
	type ChemUIListItemComponentMap,
	type ChemUIListItemContentType,
	type ChemUIListItemOptionsType,
	type ChemUIToolsItemType,
	defaultChemUIListItemComponents
} from "#/list/types";
import { Descriptions } from "#/descriptions";
import { OtherComponent } from "#/list/components";
import { ToolsList } from "#/list/components/tools";
type Props = {
	item: ChemUIListItemContentType;
	renderItem?: ChemUIListItemComponentMap;
	options?: ChemUIListItemOptionsType;
	toolsList?: ChemUIToolsItemType<ChemUIListItemContentType>[];
};
const Item = (props: Props) => {
	const { item, renderItem, options, toolsList = [] } = props;
	const { type = "", name, description } = item;
	const renderMap: ChemUIListItemComponentMap = useMemo(() => {
		const defaultRenderChemUIListItemMapChange = defaultChemUIListItemComponents
			? Object.keys(defaultChemUIListItemComponents).reduce((acc, key) => {
					acc[key.toUpperCase()] = defaultChemUIListItemComponents[key];
					return acc;
				}, {} as ChemUIListItemComponentMap)
			: ({} as ChemUIListItemComponentMap);

		// 将 renderItem 的键转换为大写
		const renderItemChange = renderItem
			? Object.keys(renderItem).reduce((acc, key) => {
					acc[key.toUpperCase()] = renderItem[key];
					return acc;
				}, {} as ChemUIListItemComponentMap)
			: ({} as ChemUIListItemComponentMap);
		return {
			...defaultRenderChemUIListItemMapChange,
			...renderItemChange
		};
	}, [renderItem]);
	const toolsRender = <ToolsList<ChemUIListItemContentType> toolsList={toolsList} dataItem={item} />;
	const Component = renderMap[type.toUpperCase()];
	if (!Component) {
		return (
			<Descriptions title={name} description={description} tools={toolsRender}>
				<OtherComponent {...item} />
			</Descriptions>
		);
	}
	return (
		<>
			<Descriptions title={name} description={description} tools={toolsRender}>
				<Component {...item} {...options} />
			</Descriptions>
		</>
	);
};

export { Item };
