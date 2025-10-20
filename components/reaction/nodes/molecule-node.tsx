import { memo } from "react";
type MoleculeData = {
	name: string;
	img: string;
};

type MoleculeNodeProps = {
	data: MoleculeData;
};
const MoleculeNode = memo((props: MoleculeNodeProps) => {
	const { data } = props;
	const { name, img } = data;
	return (
		<div>
			<div></div>
			<img className="max-h-[80px] max-w-[150px]" src={img} alt={name} />
			<div className="flex justify-center py-[10px] text-sm leading-5">
				<span>{name}</span>
			</div>
		</div>
	);
});
export type { MoleculeNodeProps };
export { MoleculeNode };
