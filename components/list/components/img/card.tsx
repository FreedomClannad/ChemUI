import { Image } from "antd";
import "./card.css";
import type { ChemUIListFileType } from "#/list/types";
const Card = (props: ChemUIListFileType) => {
	const { name, path } = props;
	return (
		<div className="w-[200px] rounded-lg border border-solid border-gray-300 pb-1.5">
			<Image src={path} alt="image" className="min-h-[180px] rounded-t-lg" />
			<div className="overflow-hidden text-ellipsis whitespace-nowrap px-[10px] text-center text-[14px] leading-[16px] text-[#4D4D4D]">
				<span>{name}</span>
			</div>
		</div>
	);
};
export { Card };
