import type { MouseEvent } from "react";
import { RiDeleteBinLine } from "@remixicon/react";
import { cn } from "#/utils";
type Props = {
	className?: string;
	onClick?: (e: MouseEvent) => void;
	iconClassName?: string;
};
export const DeleteButton = ({ className, onClick, iconClassName }: Props) => {
	return (
		<div className={cn("cursor-pointer rounded-[4px] bg-[#F5F5F5] p-1", className)} onClick={onClick}>
			<RiDeleteBinLine className={cn("h-4 w-4", iconClassName)} />
		</div>
	);
};
