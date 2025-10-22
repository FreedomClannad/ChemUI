import { cn } from "#/utils";
import { useMemo } from "react";
type Props = {
	title?: string;
	color?: "blue" | "red";
};

const colors = {
	blue: "bg-[#F2F7FC] text-[#4087FC]",
	red: "bg-[#FFF1F0] text-[#FF4D4F]"
};

const Tag = ({ title, color = "blue" }: Props) => {
	const colorMemo = useMemo(() => {
		return colors[color] || colors.blue;
	}, [color]);
	return (
		<div className={cn("w-fit rounded-[4px] bg-[#F2F7FC] p-2 text-[14px] leading-[14px] text-[#4087FC]", colorMemo)}>{title}</div>
	);
};

export { Tag };
