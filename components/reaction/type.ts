import type { ComponentType } from "react";
export type Node<T = any, U extends string | undefined = string | undefined> = {
	uid: string;
	data: T;
	type?: U;
};

export type NodeProps<T = any> = Pick<Node<T>, "type" | "data">;

export type NodeTypes<T = any> = {
	[key: string]: ComponentType<NodeProps<T> & { className?: string }>;
};

export type ReactReactionType = {
	nodes: Node[];
	nodeTypes?: NodeTypes | undefined;
};
