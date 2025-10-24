import type { ReactionConditionInfo } from "#/reaction-info-panel/type.ts";
import { Tag } from "#/reaction-info-panel/tag.tsx";
import { useWheel } from "#";
import type { Node } from "#/reaction/type";
import { DeleteButton } from "#/reaction-edit/tools.tsx";

type Props = {
	info: ReactionConditionInfo;
};

type ReactionConditionImgCardProps = {
	isDelete?: boolean;
	data: Node[];
	onDelete?: (node: Node) => void;
};
const ReactionConditionImgCardList = (props: ReactionConditionImgCardProps) => {
	const { isDelete = false, data, onDelete } = props;
	const { containerRef } = useWheel();
	return (
		<div ref={containerRef} style={{ scrollbarWidth: "none" }} className="mt-[10px] flex gap-x-5 overflow-x-auto">
			{data.map((node, index) => (
				<div
					key={index}
					className="relative flex h-[80px] w-[140px] flex-shrink-0 items-center justify-center rounded-[4px] border border-[#E6E6E6] p-1"
				>
					<img src={node.data.image} alt="img" className="max-h-[78px] max-w-[140px]" />
					{isDelete && (
						<div className="absolute right-1 top-1">
							<DeleteButton iconClassName="h-[12px] w-[12px]" onClick={() => onDelete?.(node)} />
						</div>
					)}
				</div>
			))}
		</div>
	);
};
const ReactionCondition = ({ info }: Props) => {
	return (
		<div className="border-t">
			<div className="mt-[14px]">
				<Tag title="反应条件" />
			</div>
			{info.description && (
				<div className="mt-[10px] text-[14px] leading-[24px]">
					<p>{info.description}</p>
				</div>
			)}
			{info.mol_condition.length > 0 && <ReactionConditionImgCardList data={info.mol_condition} />}
		</div>
	);
};
export { ReactionCondition, ReactionConditionImgCardList };
