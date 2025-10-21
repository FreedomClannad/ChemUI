import { cn } from "#/utils";
import type { ReactNode, MouseEvent } from "react";
import { RiArrowRightLongLine } from "@remixicon/react";

type ReactionCardProps = {
	image: string;
	title: string;
	tools?: ReactNode;
	className?: string;
	imageClassName?: string;
	titleClassName?: string;
	displayTitle?: boolean;
};
const ReactionCard = ({
	image,
	title,
	tools,
	className = "",
	imageClassName = "",
	titleClassName = "",
	displayTitle = true
}: ReactionCardProps) => {
	return (
		<div className={cn("relative flex flex-col items-center justify-between rounded-[4px] border border-dashed", className)}>
			{tools && <div className="absolute w-full">{tools}</div>}
			<div className="flex-1 p-1">
				<img src={image} alt={title} className={imageClassName} />
			</div>
			{displayTitle && (
				<div className={cn("flex-shrink-0 py-1 text-sm leading-5", titleClassName)}>
					<span>{title}</span>
				</div>
			)}
		</div>
	);
};

type ReactionAddCardProps = {
	title?: string;
	content?: string | ReactNode;
	className?: string;
	titleClassName?: string;
	onClick?: (e: MouseEvent) => void;
};

const ReactionAddCard = ({ title = "", className = "", content = "Add", titleClassName = "", onClick }: ReactionAddCardProps) => {
	return (
		<div className={cn("flex cursor-pointer flex-col items-center justify-between rounded-[4px]", className)} onClick={onClick}>
			<div className="flex h-full w-full items-center justify-center rounded-[4px] border border-dashed bg-[#FBFDFF] text-sm leading-5 text-[#ADADAD]">
				<span>{content}</span>
			</div>
			{title && (
				<div
					className={cn(
						"mt-1 flex w-full items-center justify-center rounded-[4px] bg-[#F5F5F5] py-1 text-sm leading-5 text-[#999999]",
						titleClassName
					)}
				>
					<span>{title}</span>
				</div>
			)}
		</div>
	);
};

const ReactionArrowCard = () => {
	return (
		<div className="flex h-full w-full items-center justify-center rounded-[4px] border border-dashed bg-[#FBFDFF]">
			<RiArrowRightLongLine />
		</div>
	);
};

export { ReactionCard, ReactionAddCard, ReactionArrowCard };
