import ReactMarkdown from "react-markdown";
import "katex/dist/katex.min.css";
import RemarkMath from "remark-math";
import RemarkBreaks from "remark-breaks";
import RehypeKatex from "rehype-katex";
import RemarkGfm from "remark-gfm";
import RehypeHighlight from "rehype-highlight";
import RemarkDirective from "remark-directive";
import rehypeRaw from "rehype-raw";
import RemarkDirectiveRehype from "remark-directive-rehype";
import validator from "validator";
import { visit } from "unist-util-visit";
import "./markdown.css";
import { memo } from "react";
import { cn } from "#/utils/";

// 自定义插件来禁用特定指令
const disableDirectives = () => (tree: any) => {
	visit(tree, "textDirective", (node, index, parent) => {
		parent.children.splice(index, 1, {
			type: "text",
			value: `:${node.name}${
				node.attributes
					? Object.keys(node.attributes)
							.map(key => `${key}=${node.attributes[key]}`)
							.join(" ")
					: ""
			}`
		});
	});
};

type MarkdownContentProps = {
	content: string;
};
const MarkDownContent = (props: MarkdownContentProps) => {
	const { content } = props;
	return (
		<ReactMarkdown
			remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks, RemarkDirective, RemarkDirectiveRehype, disableDirectives]}
			rehypePlugins={[
				RehypeKatex,
				[
					RehypeHighlight,
					{
						detect: false,
						ignoreMissing: true
					}
				],
				rehypeRaw
			]}
			components={{
				// p: pProps => <p {...pProps} dir="auto" />,
				em: emProps => {
					if (emProps.children) return <>*{emProps.children}*</>;
					else return <em {...emProps} />;
				},
				a: aProps => {
					const href = aProps.href || "";
					if (validator.isURL(href)) {
						const isInternal = /^\/#/i.test(href);
						const target = isInternal ? "_self" : (aProps.target ?? "_blank");
						return <a {...aProps} target={target} />;
					}
					const n_href = decodeURI(href);
					return <>{`[${aProps.children}](${n_href})`}</>;
				},
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				bucket: () => {
					return null;
				},
				hide: () => {
					return null;
				}
			}}
		>
			{content}
		</ReactMarkdown>
	);
};

export const MarkdownContent = memo(MarkDownContent, (prev, next) => {
	return prev.content === next.content;
});

type Props = {
	content: string;
	rootClassName?: string;
};
const Markdown = (props: Props) => {
	const { rootClassName } = props;
	return (
		<div className={cn("markdown-body", rootClassName)} dir="auto">
			<MarkdownContent {...props} />
		</div>
	);
};

export { Markdown };
