import { useEffect } from "react";
import { ReactionDemoList, ReactionConditionInfoDemo } from "@/pages/reaction/demo.ts";
import { ReactionInfoPanel } from "#/reaction-info-panel";
import { useReaction } from "@/pages/reaction/use-reaction.tsx";
import type { ReactionInfo } from "@/pages/reaction/type.ts";
import { getShortId } from "#/utils";
import { addNodesKey } from "#/reaction/toos.ts";

const ReactionPage = () => {
	const { reactionInfoList, setReactionInfoList, changeEditStatus } = useReaction();

	useEffect(() => {
		const n_list: ReactionInfo[] = [];
		for (let i = 0; i < 10; i++) {
			n_list.push({
				id: getShortId(),
				reaction: addNodesKey(ReactionDemoList),
				condition: ReactionConditionInfoDemo,
				isEdit: false
			} as unknown as ReactionInfo);
		}
		setReactionInfoList(n_list);
	}, []);

	const handleEditChange = (key: string, state: boolean) => {
		// 检测是否有其他项正在编辑
		const isOtherEdit = reactionInfoList.some(item => item.key !== key && item.isEdit);
		if (isOtherEdit) {
			alert("请先保存或取消其他项的编辑");
			return;
		}
		changeEditStatus(key, state);
	};

	console.log(reactionInfoList);
	return (
		<>
			<div className="mx-auto mt-10 w-[1120px]">
				{reactionInfoList.map((reactionInfo, index) => (
					<div key={index} className="mt-5 border-t border-red-600">
						<ReactionInfoPanel
							{...reactionInfo}
							onEditChange={state => handleEditChange(reactionInfo.key, state)}
							onSubmit={() => {
								console.log("提交");
							}}
						/>
					</div>
				))}
			</div>
		</>
	);
};
export default ReactionPage;
