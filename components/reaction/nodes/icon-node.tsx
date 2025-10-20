import { memo } from "react";
import { RiAddLargeLine, RiArrowRightLine } from "@remixicon/react";

type IconData = {
	type: string;
};
type IconNodeProps = {
	data: IconData;
};
const IconNode = memo((props: IconNodeProps) => {
	const { data } = props;
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
	return <div className="px-[30px]">{icon()}</div>;
});

export type { IconNodeProps };
export { IconNode };
