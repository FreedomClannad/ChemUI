import type { MouseEvent, ReactNode } from "react";
import { cn } from "#/utils";
type ImageSidebarItemType = {
	key: string;
};

type ImageSidebarProps<T> = {
	items: T[];
	render: (item: T) => ReactNode;
	onClick?: (item: T) => void;
	itemClassName?: string;
};

const ImageSidebar = <T extends ImageSidebarItemType>(props: ImageSidebarProps<T>) => {
	const { items, onClick, render, itemClassName } = props;
	return (
		<div className="h-full w-full overflow-y-auto px-5">
			{items.map(item => (
				<div
					key={item.key}
					className={cn("mb-5 w-full", itemClassName, onClick && "cursor-pointer")}
					onClick={(e: MouseEvent) => {
						console.log(e.target);
						if (
							(e.target as HTMLElement).closest(".rc-image-preview-wrap") ||
							(e.target as HTMLElement).closest(".rc-image-preview-close")
						)
							return;
						onClick?.(item);
					}}
				>
					{render(item)}
				</div>
			))}
		</div>
	);
};

export { ImageSidebar };
export type { ImageSidebarItemType, ImageSidebarProps };
