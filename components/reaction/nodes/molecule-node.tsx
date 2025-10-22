import { memo } from "react";
type MoleculeData = {
	title: string;
	image: string;
};

type MoleculeNodeProps = {
	className?: string;
	data: MoleculeData;
};
const MoleculeNode = memo((props: MoleculeNodeProps) => {
	const { className, data } = props;
	const { title, image } = data;
	return (
		<div className={className}>
			<div></div>
			<img className="max-h-[80px] max-w-[150px]" src={image} alt={title} />
			<div className="flex justify-center py-[10px] text-sm leading-5">
				<span>{title}</span>
			</div>
		</div>
	);
});
export type { MoleculeNodeProps };
export { MoleculeNode };
