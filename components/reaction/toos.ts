import type { Node } from "#/reaction/type";
import { getShortId } from "#/utils";

const addNodesKey = (nodes: any[]): Node[] => {
	return nodes.map(node => {
		return {
			...node,
			key: getShortId()
		};
	});
};

export { addNodesKey };
