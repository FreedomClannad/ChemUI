import { useMemo } from "react";
import {
	type ChemUIListConfigType,
	type ChemUIListItemComponentMap,
	type ChemUIListItemContentType,
	type ChemUIListItemOptionsType,
	type ChemUIToolsItemType
} from "#/list/types";
import { Descriptions } from "#/descriptions";
import { OtherComponent } from "#/list/components";
import { ToolsList } from "#/list/components/tools";
type Props = {
	item: ChemUIListItemContentType;
	renderComponents?: ChemUIListItemComponentMap;
	options?: ChemUIListItemOptionsType;
	toolsList?: ChemUIToolsItemType<ChemUIListItemContentType>[];
	config?: ChemUIListConfigType;
};
const Item = (props: Props) => {
	const { item, renderComponents, options, toolsList = [], config } = props;
	const { type = "", name, description } = item;
	const renderMap: ChemUIListItemComponentMap = useMemo(() => {
		// 将 renderItem 的键转换为大写
		const renderMap = renderComponents
			? Object.keys(renderComponents).reduce((acc, key) => {
					acc[key.toUpperCase()] = renderComponents[key];
					return acc;
				}, {} as ChemUIListItemComponentMap)
			: ({} as ChemUIListItemComponentMap);
		return {
			...renderMap
		};
	}, [renderComponents]);
	const toolsRender = <ToolsList<ChemUIListItemContentType> toolsList={toolsList} dataItem={item} />;
	const Component = renderMap[type.toUpperCase()];
	if (!Component) {
		return (
			<Descriptions title={name} description={description} tools={toolsRender}>
				<OtherComponent {...item} config={config} />
			</Descriptions>
		);
	}
	return (
		<>
			<Descriptions title={name} description={description} tools={toolsRender}>
				<Component {...item} {...options} config={config} />
			</Descriptions>
		</>
	);
};

export { Item };
