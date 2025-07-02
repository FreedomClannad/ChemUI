import { cn } from "#/utils";
import type { ReactNode } from "react";
export type BaseDescriptionsLayoutType = {
	className?: string;
	headerClassName?: string;
	titleClassName?: string;
	contentClassName?: string;
	title?: string;
	tools?: ReactNode;
	children?: ReactNode;
};
const BaseDescriptionsLayout = (props: BaseDescriptionsLayoutType) => {
	const { className, headerClassName, titleClassName, contentClassName, title = "", children, tools } = props;
	return (
		<div className={cn("flex flex-col", className)}>
			<div className={cn("flex h-8 justify-between leading-8", headerClassName)}>
				<div
					className={cn(
						"after:bg-primary relative flex pl-3 after:absolute after:left-0 after:top-2 after:block after:h-4 after:w-1 after:bg-blue-500 after:content-['']",
						titleClassName
					)}
				>
					{title}
				</div>
				{tools && <div className={cn("flex")}>{tools}</div>}
			</div>
			<div className={cn("px-2", contentClassName)}>{children}</div>
		</div>
	);
};

export { BaseDescriptionsLayout };
