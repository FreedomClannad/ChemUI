import { useContext } from "react";
import type { BuiltInTrajectoryFormat } from "molstar/lib/mol-plugin-state/formats/trajectory";
import type { TableDataType } from "#/table/types";
import { getMolstarFormat } from "#/molstar/utils";
import { MolstarContext } from "#/molstar/context";
import { TableColumnsContext } from "#/table/context";
type ValueType = {
	url: string;
	format: BuiltInTrajectoryFormat;
};
const TableMolstarBox = <T extends object & TableDataType>(value: string | ValueType, record: T) => {
	const { getColumnsState, setColumnsState } = useContext(TableColumnsContext);
	const { loadStructureFromUrl, setStructureVisibility } = useContext(MolstarContext);
	const { key } = record;
	const columnsState = getColumnsState(key);
	const handleClick = () => {
		if (columnsState) {
			const molstarOpen = !columnsState.molstarOpen;
			const newColumnsState = {
				...columnsState,
				molstarOpen
			};
			let url = "";
			let format = "pdb" as BuiltInTrajectoryFormat;
			if (typeof value === "string") {
				url = value;
			} else {
				url = value.url;
				format = getMolstarFormat(value.format);
			}
			setColumnsState(newColumnsState);
			setStructureVisibility({
				molstar: { id: key, visible: molstarOpen, label: key },
				addCallback: () => {
					loadStructureFromUrl({
						id: key,
						loadFileURL: {
							url,
							format
						}
					});
				}
			});
		}
	};
	if (!columnsState || !value) return null;
	return (
		<div className="flex cursor-pointer items-center justify-center text-xs" onClick={handleClick}>
			{columnsState.molstarOpen ? "开" : "关"}
		</div>
	);
};

export default TableMolstarBox;
