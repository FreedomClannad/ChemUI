import type { Node } from "#/reaction/type";
import { getShortId } from "#/utils";

// 找出箭头的Node
const findArrowNode = (nodes: Node[]) => {
	return nodes.find(node => node.type === "icon" && node.data.type === "arrow");
};

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

const transformNodes = (nodes: Node[]) => {
	const result: Node[] = [];

	nodes.forEach((node, index) => {
		result.push(node);

		// 在每两个分子之间插入 add 图标（最后一个不插）
		if (index < nodes.length - 1) {
			result.push({
				data: { type: "add" },
				type: "icon",
				key: getShortId()
			});
		}
	});

	return result;
};

// 合并反应物，产物，箭头
const mergeNodes = (reactants: Node[], arrow: Node | null, products: Node[]) => {
	const n_reactants = transformNodes(reactants);
	const n_products = transformNodes(products);
	return [...n_reactants, arrow, ...n_products];
};

export { findArrowNode, filterNodes, mergeNodes };
