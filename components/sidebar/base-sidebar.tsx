import type { ReactNode } from "react";
import { cn } from "#/utils";
type SidebarItemType = {
	key: string;
	label: string;
};

type BaseSidebarProps<T> = {
	items: T[];
	label?: (item: T) => ReactNode;
	onClick?: (item: T) => void;
	itemClassName?: string;
};
const BaseSidebar = <T extends SidebarItemType>(props: BaseSidebarProps<T>) => {
	const { items, onClick, label, itemClassName } = props;
	return (
		<div className="h-full w-full overflow-y-auto">
			{items.map(item => (
				<div
					className={cn(
						"cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap px-[18px] py-3 text-sm text-black transition-all hover:bg-gray-200",
						itemClassName
					)}
					key={item.key}
					onClick={() => {
						onClick?.(item);
					}}
				>
					{label ? label(item) : item.label}
				</div>
			))}
		</div>
	);
};

export { BaseSidebar };
export type { SidebarItemType, BaseSidebarProps };
