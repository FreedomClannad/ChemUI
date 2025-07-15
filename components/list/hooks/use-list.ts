import { useMemo } from "react";
import { type ChemUIAppItemType, type ChemUIListItemComponentMap, defaultChemUIListItemComponents } from "#/list/types";
import { detectMergeItemType } from "#/list/tools.ts";

const useList = () => {
	const parseJSONList = (json: string) => {
		if (json) {
			try {
				const newOption = JSON.parse(json);
				const ChemUIType = detectMergeItemType(newOption);
				if (ChemUIType !== "UNKNOWN") {
					if (ChemUIType === "APP") {
						const { visual_data } = newOption as ChemUIAppItemType;
						return visual_data;
					} else {
						return newOption;
					}
				}
			} catch (e) {
				console.error(e);
				return [];
			}
		}
		return [];
	};

	const validateObjectList = (obj: never) => {
		const ChemUIType = detectMergeItemType(obj);
		if (ChemUIType !== "UNKNOWN") {
			if (ChemUIType === "APP") {
				const { visual_data } = obj as ChemUIAppItemType;
				return visual_data;
			} else {
				return obj;
			}
		}
	};

	const renderComponents = useMemo(() => {
		const defaultComponents = defaultChemUIListItemComponents();
		return defaultComponents
			? Object.keys(defaultComponents).reduce((acc, key) => {
					acc[key.toUpperCase()] = defaultComponents[key];
					return acc;
				}, {} as ChemUIListItemComponentMap)
			: ({} as ChemUIListItemComponentMap);
	}, []);

	return { parseJSONList, validateObjectList, renderComponents };
};

export default useList;
