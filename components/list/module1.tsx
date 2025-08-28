import { type ModuleType } from "#/list/types";
import { makeRendererGetter, mergeRenderers } from "#/list/tools";
import { baseRenderers } from "#/list/render/base-render.tsx";
import { FallbackRenderer } from "#/list/render/fallback-render.tsx";

const Module = (props: ModuleType) => {
	const renderers = mergeRenderers(baseRenderers);
	const getRenderer = makeRendererGetter(renderers, FallbackRenderer);
	const Renderer = getRenderer(props.type);
	return <Renderer {...(props as any)} />;
};

export { Module };
