import type { Node } from "#/reaction/type";
// 过滤出反应物，产物，箭头
const filterNodes = (nodes: Node[]) => {
	// 过滤出反应物，产物，箭头,反应物是箭头前面的，产物是箭头后面的，箭头的属性是icon里面的data的type为arrow
	const arrowIndex = nodes.findIndex(node => node.type === "icon" && node.data.type === "arrow");
	let reactants: Node[] = [];
	let products: Node[] = [];
	let arrow: Node | null = null;
	if (arrowIndex !== -1) {
		arrow = nodes[arrowIndex];
		reactants = nodes.slice(0, arrowIndex).filter(node => node.type === "molecule");
		products = nodes.slice(arrowIndex + 1).filter(node => node.type === "molecule");
	}
	return {
		arrow,
		reactants,
		products
	};
};

export { filterNodes };
