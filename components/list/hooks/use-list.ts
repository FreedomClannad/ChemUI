import { useEffect, useMemo, useState } from "react";
import {
	type ChemUIAppItemType,
	type ChemUIListItemComponentMap,
	type ChemUIModuleItemType,
	defaultChemUIListItemComponents
} from "#/list/types";
import { detectMergeItemType } from "#/list/tools.ts";

const useList = (result: string) => {
	const [moduleItemList, setModuleItemList] = useState<ChemUIModuleItemType[]>([]);
	useEffect(() => {
		if (result) {
			try {
				const newOption = JSON.parse(result);
				const ChemUIType = detectMergeItemType(newOption);
				if (ChemUIType !== "UNKNOWN") {
					if (ChemUIType === "APP") {
						const { visual_data } = newOption as ChemUIAppItemType;
						setModuleItemList(visual_data);
					} else {
						setModuleItemList(newOption);
					}
				}
			} catch (e) {
				console.error(e);
				setModuleItemList([]);
			}
		}
	}, [result]);

	const renderComponents = useMemo(() => {
		return defaultChemUIListItemComponents
			? Object.keys(defaultChemUIListItemComponents).reduce((acc, key) => {
					acc[key.toUpperCase()] = defaultChemUIListItemComponents[key];
					return acc;
				}, {} as ChemUIListItemComponentMap)
			: ({} as ChemUIListItemComponentMap);
	}, [defaultChemUIListItemComponents]);

	return { moduleItemList, renderComponents };
};

export default useList;
