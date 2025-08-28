// types.ts
import type {
	ChemUIListConfigType,
	ChemUIListItemComponentMap,
	ChemUIListItemContentType,
	ChemUIListItemOptionsType,
	ChemUIListToolsType,
	ChemUIModuleItemType,
	ChemUITextItemType
} from "#/list/types";
import type { JSX } from "react";

/** —— 各类型的专有 props —— */

// 文件型
export type FileModule = {
	type: "file";
	data: ChemUIListItemContentType;
	renderOptions?: ChemUIListItemOptionsType;
	renderComponents?: ChemUIListItemComponentMap;
	config?: ChemUIListConfigType;
	toolsData?: ChemUIListToolsType;
};

// 文本型
export type TextModule = {
	type: "text";
	data: ChemUITextItemType;
	toolsData?: ChemUIListToolsType;
};

// 头部（分组/标题）
export type HeaderModule = {
	type: "header";
	data: ChemUIModuleItemType;
	toolsData?: ChemUIListToolsType;
};

/** —— 总的 Discriminated Union —— */
export type ModuleType = FileModule | TextModule | HeaderModule;

// 提取 FileModule 除去 type 和 data
export type FileModuleRest = Omit<FileModule, "type" | "data">;

// 提取 TextModule 除去 type 和 data
export type TextModuleRest = Omit<TextModule, "type" | "data">;

// 提取 HeaderModule 除去 type 和 data
export type HeaderModuleRest = Omit<HeaderModule, "type" | "data">;

type WithoutTypeAndData<T> = Omit<T, "type" | "data">;

export type ModuleRest = WithoutTypeAndData<FileModule> | WithoutTypeAndData<TextModule> | WithoutTypeAndData<HeaderModule>;

/** —— 工具类型 —— */
export type ModuleKind = ModuleType["type"];
export type RendererOf<T extends ModuleKind> = (props: Extract<ModuleType, { type: T }>) => JSX.Element;

// 允许“插件式”部分提供，而不是一次性全部提供
export type RendererMapPartial = {
	[K in ModuleKind]?: RendererOf<K>;
};
