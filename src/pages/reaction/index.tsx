import { type NamedExoticComponent, useMemo } from "react";
import { ReactReaction } from "#/reaction/react-reaction.tsx";
import type { Node } from "#/reaction/type.ts";
import { IconNode, type IconNodeProps, MoleculeNode, type MoleculeNodeProps } from "#/reaction/nodes";
import { ReactionDemoList } from "@/pages/reaction/demo.ts";

const createList = (): Node[] => {
	const list: Node[] = [];
	for (let i = 1; i <= 10; i++) {
		list.push({
			data: {
				type: "icon"
			},
			type: i % 2 === 0 ? "icon" : "molecule",
			id: `${i}`
		});
	}
	return list;
};
const iconNode: NamedExoticComponent<IconNodeProps> = IconNode;
const moleculeNode: NamedExoticComponent<MoleculeNodeProps> = MoleculeNode;
const nodeTypes = {
	icon: iconNode,
	molecule: moleculeNode
};

const ReactionPage = () => {
	const nodes = useMemo(() => {
		return ReactionDemoList;
	}, []);
	return (
		<div className="max-w-[600px]">
			<ReactReaction nodes={nodes} nodeTypes={nodeTypes} />;
		</div>
	);
};
export default ReactionPage;
