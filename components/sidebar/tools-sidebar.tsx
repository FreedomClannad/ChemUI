import type { ReactNode } from "react";
import { BaseSidebar, type BaseSidebarProps, type SidebarItemType } from "#/sidebar";
import { VerticalTitleCard } from "#/card";
type ToolsSidebarProps<T> = {
	title?: string;
	tools: ReactNode;
} & BaseSidebarProps<T>;
const ToolsSidebar = <T extends SidebarItemType>(props: ToolsSidebarProps<T>) => {
	const { title = "", tools } = props;
	return (
		<VerticalTitleCard
			title={title}
			className="h-full"
			header={{
				rootClassName: "h-[36px] bg-[#f2f3f5]",
				className: "items-center after:!top-[9px]",
				right: tools
			}}
			contentStyle={{ height: "calc(100% - 36px)" }}
		>
			<BaseSidebar<T> {...props} />
		</VerticalTitleCard>
	);
};

export { ToolsSidebar };
