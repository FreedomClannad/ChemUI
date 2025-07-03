import type { AlignType } from "rc-table/lib/interface";
import { formatterAlign } from "#/table/utils";
import { cn } from "#/utils";
export const TableHeaderTooltipBox = (title: string, tooltip = "", align: AlignType = "left") => {
	const alignStr = formatterAlign(align);
	if (tooltip) {
		return (
			<div className={cn("flex items-center", alignStr)}>
				<span>{title}</span>
				{/* TODO 这里需要新增info的提示信息 */}
				{/*<Tooltip popupContent={tooltip}>*/}
				{/*	<i className="ml-[6px]">*/}
				{/*		<IconSVG name="AlmPromptIcon" style={{ width: "14px", height: "14px" }} />*/}
				{/*	</i>*/}
				{/*</Tooltip>*/}
			</div>
		);
	}
	return <span>{title}</span>;
};
