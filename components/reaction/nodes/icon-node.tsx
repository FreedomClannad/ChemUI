import { memo } from "react";
import { RiAddLargeLine, RiArrowRightLine } from "@remixicon/react";
import { cn } from "#/utils";
type IconData = {
	type: string;
};
type IconNodeProps = {
	className?: string;
	data: IconData;
};
const IconNode = memo((props: IconNodeProps) => {
	const { className, data } = props;
	const { type } = data;
	const icon = () => {
		switch (type) {
			case "add":
				return <RiAddLargeLine />;
			case "arrow":
				return <RiArrowRightLine />;
			default:
				return null;
		}
	};
	return <div className={cn("px-[30px]", className)}>{icon()}</div>;
});

export type { IconNodeProps };
export { IconNode };
