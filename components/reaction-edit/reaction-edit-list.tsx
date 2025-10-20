import { ReactionAddCard, ReactionCard } from "#/reaction-edit/card.tsx";
import type { MouseEvent } from "react";
import type { Compound } from "#/reaction-edit/type.ts";
import { DeleteButton } from "#/reaction-edit/tools.tsx";

type ReactionEditProps = {
	compounds: Compound[];
	addClick: (e: MouseEvent) => void;
	removeClick: (compound: Compound) => void;
	addInfo?: {
		title: string;
		content: string;
	};
};

const ReactionEditList = ({
	compounds,
	addClick,
	removeClick,
	addInfo = { title: "名称", content: "添加" }
}: ReactionEditProps) => {
	return (
		<div className="flex flex-wrap gap-5">
			{compounds.map((compound, index) => (
				<ReactionCard
					key={`reaction-edit_${index}`}
					className="h-[130px] w-[130px]"
					imageClassName="w-full h-full object-contain aspect-[4/3]"
					tools={
						<div className="flex w-full justify-end p-1">
							<DeleteButton
								onClick={() => {
									removeClick(compound);
								}}
							/>
						</div>
					}
					{...compound}
				/>
			))}
			<ReactionAddCard className="h-[130px] w-[130px]" {...addInfo} onClick={addClick} />
		</div>
	);
};

export { ReactionEditList };
