import type { Node, ReactReactionType } from "#/reaction/type";
import { cn } from "#/utils";
import { useWheel } from "#";
type Props = {
	className?: string;
} & ReactReactionType;
const ReactReaction = (props: Props) => {
	const { className, nodes, nodeTypes } = props;
	const { containerRef } = useWheel();
	const render = (node: Node) => {
		const Component = nodeTypes?.[node.type ?? ""];
		if (!Component) {
			return <div key={node.key}>{node.key}</div>; // fallback
		}
		return <Component {...node} className="flex-shrink-0" />;
	};
	return (
		<div
			ref={containerRef}
			style={{ scrollbarWidth: "none" }}
			className={cn("flex w-full items-center overflow-x-auto overscroll-contain", className)}
		>
			{nodes.map(render)}
		</div>
	);
};

export { ReactReaction };
