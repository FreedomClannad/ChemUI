import { useState } from "react";
import type { Compound } from "#/reaction-edit/type.ts";

const useReactionEdit = () => {
	const [compoundList, setCompoundList] = useState<Compound[]>([]);
	const addCompound = (compound: Compound) => {
		setCompoundList([...compoundList, compound]);
	};
	const removeCompound = (compound: Compound) => {
		setCompoundList(compoundList.filter(item => item.id !== compound.id));
	};
	return {
		compoundList,
		setCompoundList,
		addCompound,
		removeCompound
	};
};

export { useReactionEdit };
