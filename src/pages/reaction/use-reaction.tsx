import { useState } from "react";
import type { ReactionInfo } from "@/pages/reaction/type";

const useReaction = () => {
	const [reactionInfoList, setReactionInfoList] = useState<ReactionInfo[]>([]);
	// 单个化学反应改变的事件
	const changeReactionInfo = (info: ReactionInfo) => {
		setReactionInfoList(prev => prev.map(item => (item.uid === info.uid ? info : item)));
	};

	// 编辑状态改变事件
	const changeEditStatus = (uid: string, state: boolean) => {
		setReactionInfoList(prev => prev.map(item => (item.uid === uid ? { ...item, isEdit: state } : item)));
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
