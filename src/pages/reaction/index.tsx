import { type NamedExoticComponent, useEffect, useMemo, useState } from "react";
import { ReactReaction } from "#/reaction/react-reaction.tsx";
import type { Node } from "#/reaction/type.ts";
import { IconNode, type IconNodeProps, MoleculeNode, type MoleculeNodeProps } from "#/reaction/nodes";
import { ReactionDemoCompoundList, ReactionDemoList } from "@/pages/reaction/demo.ts";
import { ReactionArrowCard, ReactionCard } from "#/reaction-edit/card.tsx";
import { ReactionEditList } from "#/reaction-edit";
import { useReactionEdit } from "#/reaction-edit/hook/use-reaction-edit.ts";

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

	const { compoundList, setCompoundList, addCompound, removeCompound } = useReactionEdit();
	useEffect(() => {
		setCompoundList(ReactionDemoCompoundList);
	}, []);

	const addClick = () => {
		addCompound({
			id: "11",
			title: "新化合物",
			image:
				"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png"
		});
	};
	return (
		<>
			<div className="max-w-[600px]">
				<ReactReaction nodes={nodes} nodeTypes={nodeTypes} />
			</div>
			<div className="max-w-[600px]">
				<ReactionEditList
					compounds={compoundList}
					addInfo={{
						title: "名称",
						content: "添加"
					}}
					addClick={addClick}
					removeClick={removeCompound}
				/>
			</div>
			<div className="h-[60px] w-[120px]">
				<ReactionArrowCard />
			</div>
		</>
	);
};
export default ReactionPage;
