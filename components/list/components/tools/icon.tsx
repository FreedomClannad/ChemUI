import type { ReactNode } from "react";

type Props = {
	icon: ReactNode;
	onClick: () => void;
};
export const ToolsIcon = (props: Props) => {
	const { icon, onClick } = props;
	if (!icon) return null;
	return <div onClick={onClick}>{icon}</div>;
};
