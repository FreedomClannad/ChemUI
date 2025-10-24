import { useState } from "react";
import type { Node } from "#/reaction/type";
const useReactionCondition = () => {
	// 化学反应描述用语
	const [conditionDescription, setConditionDescription] = useState("");

	// 化学反应反应条件
	const [molCondition, setMolCondition] = useState<Node[]>([]);
	const removeMolCondition = (node: Node) => {
		setMolCondition(molCondition.filter(item => item.uid !== node.uid));
	};
	// 化学反应的
	return { conditionDescription, setConditionDescription, molCondition, setMolCondition, removeMolCondition };
};

export { useReactionCondition };
