import { TableHeaderTypeEnum } from "#/table/types";

export * from "./table-header-tooltip-box.tsx";
export * from "./table-img-box";

import { TableImgBox } from "./table-img-box.tsx";
import type { ReactNode } from "react";
import TableMolstarBox from "#/table/components/table-molstar-box.tsx";

type TableCellRenderer = (...args: unknown[]) => ReactNode;
type TableColumnsBoxType = {
	[K in TableHeaderTypeEnum.IMG | TableHeaderTypeEnum.MOLSTAR]: TableCellRenderer;
};

export const TableColumnsBox: TableColumnsBoxType = {
	[TableHeaderTypeEnum.IMG]: TableImgBox as TableCellRenderer,
	[TableHeaderTypeEnum.MOLSTAR]: TableMolstarBox as TableCellRenderer
};
