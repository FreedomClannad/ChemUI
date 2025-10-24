import { useState } from "react";
import type { ReactionInfo } from "@/pages/reaction/type";

const useReaction = () => {
	const [reactionInfoList, setReactionInfoList] = useState<ReactionInfo[]>([]);
	// 单个化学反应改变的事件
	const changeReactionInfo = () => {};

	// 编辑状态改变事件
	const changeEditStatus = (key: string, state: boolean) => {
		setReactionInfoList(prev => prev.map(item => (item.key === key ? { ...item, isEdit: state } : item)));
	};

	//
	return {
		reactionInfoList,

		setReactionInfoList,
		changeReactionInfo,
		changeEditStatus
	};
};

export { useReaction };
