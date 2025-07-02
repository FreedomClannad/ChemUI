import { useEffect, useState } from "react";
import type { ChemUIAppItemType, ChemUIModuleItemType } from "#/list/types";
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

	return { moduleItemList };
};

export default useList;
