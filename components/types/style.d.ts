// 让 TypeScript 知道如何处理 CSS 模块
declare module "*.css" {
	const content: { [className: string]: string };
	export default content;
}
