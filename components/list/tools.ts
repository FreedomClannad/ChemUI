import { has, isObject } from "lodash-es";
import type { ChemUIAppItemType, ChemUIModuleItemType } from "#/list/types";
import type { ModuleKind, ModuleType, RendererMapPartial, RendererOf } from "./types";
import type { JSX } from "react";
export const isChemUIModuleArrayType = (obj: unknown): obj is ChemUIModuleItemType[] => {
	return (
		Array.isArray(obj) &&
		obj.every(
			item =>
				typeof item === "object" &&
				item !== null &&
				typeof item.name === "string" &&
				(item.description === undefined || typeof item.description === "string") &&
				(item.files === undefined || Array.isArray(item.files))
			// TODO 这里暂时屏蔽针对text的内容
			// && (item.text === undefined || (
			//   Array.isArray(item.text)
			//     && item.text.every((text: any) =>
			//       typeof text.name === 'string'
			//         && typeof text.content === 'string',
			//     )
			// )),
		)
	);
};
export function isChemUIAppItemType(obj: unknown): obj is ChemUIAppItemType {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return isObject(obj) && obj !== null && has(obj, "visual_data") && isChemUIModuleArrayType((obj as any).visual_data);
}
export const detectMergeItemType = (obj: unknown): "APP" | "MODULE" | "UNKNOWN" => {
	if (isChemUIAppItemType(obj)) return "APP";
	if (isChemUIModuleArrayType(obj)) return "MODULE";
	return "UNKNOWN";
};

/** 工厂：通过回调 register 统一收集各类型的 renderer（插件可各自调用） */
export function createRenderers(
	build: (register: <T extends ModuleKind>(type: T, renderer: RendererOf<T>) => void) => void
): RendererMapPartial {
	const map: RendererMapPartial = {};
	const register = <T extends ModuleKind>(type: T, renderer: RendererOf<T>) => {
		map[type] = renderer as any;
	};
	build(register);
	return map;
}

/** 合并多个 renderer 映射（后者会覆盖前者的同名 type） */
export function mergeRenderers(...sources: RendererMapPartial[]): RendererMapPartial {
	return Object.assign({}, ...sources);
}

/** 按类型安全获取 renderer，若缺失则使用 fallback */
export function makeRendererGetter(map: RendererMapPartial, fallback: (props: ModuleType) => JSX.Element) {
	return <T extends ModuleKind>(type: T): RendererOf<T> => {
		const r = map[type];
		return (r ?? (fallback as any)) as RendererOf<T>;
	};
}

export function arrayTransform(arr: ChemUIModuleItemType[]): ModuleType[] {
	const list: ModuleType[] = [];
	console.log(arr);
	arr.forEach(item => {
		const { name, files = [], text = [], description, options, download_url } = item;
		list.push({
			type: "header",
			data: { name, description, download_url, options }
		});
		list.push(...files.map(item => ({ type: "file", data: item }) as const));
		list.push(...text.map(item => ({ type: "text", data: item }) as const));
	});
	return list;
}
