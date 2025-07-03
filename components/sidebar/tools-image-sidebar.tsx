import type { ReactNode } from "react";
import { ImageSidebar, type ImageSidebarItemType, type ImageSidebarProps } from "#/sidebar";
import { VerticalTitleCard } from "#/card";
type ToolsSidebarProps<T> = {
	title?: string;
	tools: ReactNode;
} & ImageSidebarProps<T>;
const ToolsImageSidebar = <T extends ImageSidebarItemType>(props: ToolsSidebarProps<T>) => {
	const { title = "", tools } = props;
	return (
		<VerticalTitleCard
			title={title}
			rootClass="h-full"
			headerClass="h-[36px] bg-[#f2f3f5]"
			headerSpanClassName="items-center after:!top-[9px]"
			contentStyle={{ height: "calc(100% - 36px - 0.75rem)" }}
			right={tools}
		>
			<ImageSidebar<T> {...props} />
		</VerticalTitleCard>
	);
};

export { ToolsImageSidebar };
