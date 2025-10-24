import type { ReactionConditionInfo } from "#/reaction-info-panel/type.ts";

type ReactionInfo = {
	key: string;
	reaction: any[];
	condition: ReactionConditionInfo;
	isEdit: boolean;
	state: "success" | "error";
};

export type { ReactionInfo };
