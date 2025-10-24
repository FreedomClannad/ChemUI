import { useState } from "react";
import type { Node } from "#/reaction/type.ts";
const useReactionEdit = () => {
	const [compoundNode, setCompoundNode] = useState<Node[]>([]);
	const addCompoundNode = (node: Node) => {
		setCompoundNode([...compoundNode, node]);
	};
	const removeCompoundNode = (node: Node) => {
		setCompoundNode(compoundNode.filter(item => item.key !== node.key));
	};
	return {
		compoundNode,
		setCompoundNode,
		addCompoundNode,
		removeCompoundNode
	};
};

export { useReactionEdit };
