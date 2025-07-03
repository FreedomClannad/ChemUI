import Image from "./image";

type Props = {
	name: string;
	src: string;
};
const ImageCard = (props: Props) => {
	const { name, src } = props;
	return (
		<div className="h-full w-full">
			<div className="overflow-hidden text-ellipsis whitespace-nowrap py-[2px] text-sm text-gray-900">{name}</div>
			<Image placement={{ bottom: 0, right: 0 }} className="h-full min-h-[180px] w-full" src={src} rootClassName="!inline" />
		</div>
	);
};

export { ImageCard };
