import type { Node } from "#/reaction/type";
export type ReactionConditionInfo = {
	state: "success" | "error";
	description: string | undefined;
	mol_condition: Node[];
};
