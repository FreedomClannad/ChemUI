import type { CSSProperties, ReactNode } from "react";
import style from "./style.module.css";
import { cn } from "#/utils";
type Props = {
	title: string;
	rootClass?: string;
	headerClass?: string;
	headerSpanClassName?: string;
	contentClass?: string;
	children?: ReactNode;
	right?: ReactNode;
	titleSpanClassName?: string;
	contentStyle?: CSSProperties;
};
const VerticalTitleCard = (props: Props) => {
	const { title, rootClass, headerClass, headerSpanClassName, contentClass, children, right, titleSpanClassName, contentStyle } =
		props;
	return (
		<>
			<div className={rootClass}>
				<div className={cn("flex justify-between", headerClass)}>
					<div className={cn(style.title, "after:bg-primary relative flex pl-3", headerSpanClassName)}>
						<span className={cn("text-gray-1010 text-sm font-normal", titleSpanClassName)} style={{ lineHeight: "20px" }}>
							{title}
						</span>
						{/*这里有个Info提示信息*/}
						{/*<Tooltip popupContent={tooltip} disabled={tooltipDisabled}>*/}
						{/*	{tooltipDisabled ? (*/}
						{/*		<></>*/}
						{/*	) : (*/}
						{/*		<div className="ml-[10px] flex items-center">*/}
						{/*			<IconSVG name="AlmPromptIcon" style={{ width: "14px", height: "14px" }} />*/}
						{/*		</div>*/}
						{/*	)}*/}
						{/*</Tooltip>*/}
					</div>
					<div className="flex items-center justify-center">
						{right && <div className={cn("flex items-center justify-center")}>{right}</div>}
					</div>
				</div>
				<div className={cn("mt-3", contentClass)} style={contentStyle}>
					{children}
				</div>
			</div>
		</>
	);
};

export { VerticalTitleCard };
