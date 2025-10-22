import { ReactReaction } from "#/reaction";
import { type NamedExoticComponent, useEffect, useState } from "react";
import type { Node } from "#/reaction/type";
import { IconNode, type IconNodeProps, MoleculeNode, type MoleculeNodeProps } from "#/reaction/nodes";
import { RiEditBoxLine } from "@remixicon/react";
import type { ReactionConditionInfo } from "#/reaction-info-panel/type.ts";
import { ReactionCondition } from "#/reaction-info-panel/reaction-condition.tsx";

const iconNode: NamedExoticComponent<IconNodeProps> = IconNode;
const moleculeNode: NamedExoticComponent<MoleculeNodeProps> = MoleculeNode;
const nodeTypes = {
	icon: iconNode,
	molecule: moleculeNode
};

type ReactionInfoPanelProps = {
	data: any;
	info: ReactionConditionInfo;
};

const ReactionInfoPanel = (props: ReactionInfoPanelProps) => {
	const { data, info } = props;
	const [nodes, setNodes] = useState<Node[]>([]);
	useEffect(() => {
		if (!data) {
			return;
		}
		//TODO 转换数据格式, 这里可以增加一个函数, 把 data 转换为 Node[] 格式，
		setNodes(data);
	}, [data]);

	return (
		<div>
			<div className="flex gap-x-2">
				<ReactReaction nodes={nodes} nodeTypes={nodeTypes} className="py-5" />
				<div className="flex-shrink-0 py-5">
					<div className="cursor-pointer rounded-[4px] bg-[#F5F5F5] p-1">
						<RiEditBoxLine className="h-[14px] w-[14px]" />
					</div>
				</div>
			</div>
			<ReactionCondition info={info} />
		</div>
	);
};

export { ReactionInfoPanel };
