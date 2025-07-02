import { useMemo } from "react";
import { ToolsList } from "#/list/components/tools";
import type { ChemUITextItemType, ChemUIToolsItemType } from "#/list/types";
import { Descriptions } from "#/descriptions";
import { Text } from "#/text";

type Props = {
	data: ChemUITextItemType;
	toolsList?: ChemUIToolsItemType<ChemUITextItemType>[];
};
const TextItem = (props: Props) => {
	const { data, toolsList = [] } = props;
	const { name, description, content } = data;
	const result = useMemo(() => {
		if (typeof content === "string") return content;
		try {
			return JSON.stringify(content);
		} catch {
			return String(content);
		}
	}, [content]);

	const toolsRender = <ToolsList<ChemUITextItemType> toolsList={toolsList} dataItem={data} />;

	return (
		<>
			<Descriptions title={name} description={description} tools={toolsRender}>
				<Text result={result} />
			</Descriptions>
		</>
	);
};
export { TextItem };
