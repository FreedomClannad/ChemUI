import { useMemo } from "react";
import type { ReactionConditionInfo } from "#/reaction-info-panel/type.ts";
import { Tag } from "#/reaction-info-panel/tag.tsx";
import { useWheel } from "#";
type TagInfo = {
	title: string;
	color: "blue" | "red";
};
type Props = {
	info: ReactionConditionInfo;
};
const ReactionCondition = ({ info }: Props) => {
	const { containerRef } = useWheel();
	const tagInfo: TagInfo = useMemo(() => {
		if (info.state === "success")
			return {
				title: "反应条件",
				color: "blue"
			};
		return {
			title: "异常反应",
			color: "red"
		};
	}, [info]);
	return (
		<div className="border-t">
			<div className="mt-[14px]">
				<Tag title={tagInfo.title} color={tagInfo.color} />
			</div>
			{info.description && (
				<div className="mt-[10px] text-[14px] leading-[24px]">
					<p>{info.description}</p>
				</div>
			)}
			{info.images.length > 0 && (
				<div ref={containerRef} className="mt-[10px] flex gap-x-5 overflow-x-auto">
					{info.images.map((image, index) => (
						<div className="flex h-[80px] w-[140px] flex-shrink-0 items-center justify-center rounded-[4px] border border-[#E6E6E6] p-1">
							<img key={index} src={image} alt={`反应图片${index}`} className="max-h-[78px] max-w-[140px]" />
						</div>
					))}
				</div>
			)}
		</div>
	);
};
export { ReactionCondition };
