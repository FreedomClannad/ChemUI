import type { Node, ReactReactionType } from "#/reaction/type";

const ReactReaction = (props: ReactReactionType) => {
	const { nodes, nodeTypes } = props;
	const render = (node: Node) => {
		const Component = nodeTypes?.[node.type ?? ""];
		if (!Component) {
			return <div key={node.id}>{node.id}</div>; // fallback
		}
		return <Component key={node.id} {...node} />;
	};
	return <div className="flex w-full items-center overflow-x-auto">{nodes.map(render)}</div>;
};

export { ReactReaction };
