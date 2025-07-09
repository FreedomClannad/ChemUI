import { LoadingOutlined } from "@ant-design/icons";
import type { ReactNode } from "react";
type Props = {
	icon?: ReactNode;
	text?: string;
};
const Loading = (props: Props) => {
	const { icon = <LoadingOutlined className="text-[20px] text-gray-700" />, text = "Loading" } = props;
	return (
		<div className="flex flex-col">
			{icon}
			<span className="mt-2 text-sm text-gray-700">{text}</span>
		</div>
	);
};

export { Loading };
