import { has, isObject } from "lodash-es";
import type { ChemUIAppItemType, ChemUIModuleItemType } from "#/list/types";
export const isChemUIModuleArrayType = (obj: unknown): obj is ChemUIModuleItemType[] => {
	return (
		Array.isArray(obj) &&
		obj.every(
			item =>
				typeof item === "object" &&
				item !== null &&
				typeof item.name === "string" &&
				(item.description === undefined || typeof item.description === "string") &&
				(item.files === undefined || Array.isArray(item.files))
			// TODO 这里暂时屏蔽针对text的内容
			// && (item.text === undefined || (
			//   Array.isArray(item.text)
			//     && item.text.every((text: any) =>
			//       typeof text.name === 'string'
			//         && typeof text.content === 'string',
			//     )
			// )),
		)
	);
};
export function isChemUIAppItemType(obj: unknown): obj is ChemUIAppItemType {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return isObject(obj) && obj !== null && has(obj, "visual_data") && isChemUIModuleArrayType((obj as any).visual_data);
}
export const detectMergeItemType = (obj: unknown): "APP" | "MODULE" | "UNKNOWN" => {
	if (isChemUIAppItemType(obj)) return "APP";
	if (isChemUIModuleArrayType(obj)) return "MODULE";
	return "UNKNOWN";
};
