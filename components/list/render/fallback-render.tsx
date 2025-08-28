import type { ModuleType } from "#/list/types";

export function FallbackRenderer(props: ModuleType) {
	return (
		<div className="rounded-lg border border-dashed p-3 text-sm opacity-80">
			<div className="font-medium">⚠ 未注册的渲染器类型：</div>
			<div className="mt-1">
				<span className="font-mono">type</span>: <span className="font-mono">{props.type}</span>
			</div>
			<pre className="mt-2 overflow-auto rounded bg-neutral-50 p-2 text-xs">{safeStringify(props)}</pre>
		</div>
	);
}

function safeStringify(v: unknown) {
	try {
		return JSON.stringify(v, null, 2);
	} catch {
		return String(v);
	}
}
