import type { CSSProperties, ReactNode } from "react";
import style from "./style.module.css";
import { cn } from "#/utils";
export type HeaderType = {
	rootClassName?: string;
	className?: string;
	left?: ReactNode;
	right?: ReactNode;
};
type Props = {
	title: string;
	children?: ReactNode;
	contentStyle?: CSSProperties;
	header?: HeaderType;
	className?: string;
	titleClassName?: string;
	contentClassName?: string;
};
const VerticalTitleCard = (props: Props) => {
	const { title, titleClassName, className, header, contentClassName, children, contentStyle } = props;
	return (
		<>
			<div className={className}>
				<div className={cn("flex justify-between", header?.rootClassName)}>
					<div className={cn(style.title, "after:bg-primary relative flex pl-3", header?.className)}>
						<span className={cn("text-gray-1010 text-sm font-normal", titleClassName)} style={{ lineHeight: "20px" }}>
							{title}
						</span>
						{header?.left}
					</div>
					{header?.right && <div className="flex items-center">{header?.right}</div>}
				</div>
				<div className={cn(contentClassName)} style={contentStyle}>
					{children}
				</div>
			</div>
		</>
	);
};

export { VerticalTitleCard };
