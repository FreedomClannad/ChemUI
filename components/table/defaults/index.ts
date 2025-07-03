import type { TableOptionType } from "#/table/types";
import { LayoutDirectionEnum } from "#/layout/types";
import { MOLSTAR_DEFAULT } from "#/table/defaults/molstar";

export const TABLE_OPTIONS_DEFAULT: TableOptionType = {
	molstar: MOLSTAR_DEFAULT
};

export const TABLE_LAYOUT_DIRECTION_DEFAULT: LayoutDirectionEnum = LayoutDirectionEnum.LEFT;
