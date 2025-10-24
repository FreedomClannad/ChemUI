import { ReactionAddCard, ReactionCard } from "#/reaction-edit/card.tsx";
import type { MouseEvent } from "react";
import { DeleteButton } from "#/reaction-edit/tools.tsx";
import type { Node } from "#/reaction/type";
type ReactionEditProps = {
	nodes: Node[];
	addClick: (e: MouseEvent) => void;
	removeClick: (node: Node) => void;
	addInfo?: {
		title: string;
		content: string;
	};
};

const ReactionEditList = ({ nodes, addClick, removeClick, addInfo = { title: "名称", content: "添加" } }: ReactionEditProps) => {
	return (
		<div className="grid grid-cols-3 gap-5 [grid-auto-rows:130px]">
			{nodes.map((node, index) => (
				<ReactionCard
					key={`reaction-edit_${index}`}
					className="h-[130px] w-[130px]"
					imageClassName="w-full h-full object-contain aspect-[4/3]"
					tools={
						<div className="flex w-full justify-end p-1">
							<DeleteButton
								onClick={() => {
									removeClick(node);
								}}
							/>
						</div>
					}
					{...node.data}
				/>
			))}
			<ReactionAddCard className="h-[130px] w-[130px]" {...addInfo} onClick={addClick} />
		</div>
	);
};

export { ReactionEditList };
