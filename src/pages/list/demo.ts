import { type ChemUIListItemType, ChemUIListTypeEnum } from "#/list/types";

export const DemoImgList = () => {
	const path: { name: string; path: string }[] = [];
	for (let i = 0; i < 20; i++) {
		path.push({
			name: `这是图片描述内容这是图片描述内容这是图片描述内容这是图片描述内容这是图片描述内容这是图片描述内容${i}`,
			path: "https://patmap.alphama.com.cn/prod-api/profile/csr/2024/12/13/b1d004f9-5481-45ac-9ebe-2571fd3755a3.svg"
		});
	}
	const files = [
		{
			type: ChemUIListTypeEnum.IMG,
			name: "这是图片列表内容",
			path,
			format: "img"
		}
	] as ChemUIListItemType[];
	return [
		{
			name: "这是一个模块",
			description: "这是一个模块的描述",
			// files: Demo3DPreviewPanel,
			files
		}
	];
};

export const DemoSingleImg = () => {
	const files = [
		{
			type: ChemUIListTypeEnum.IMG,
			name: "这是图片列表内容",
			path: "https://patmap.alphama.com.cn/prod-api/profile/csr/2024/12/13/b1d004f9-5481-45ac-9ebe-2571fd3755a3.svg",
			format: "img"
		}
	] as ChemUIListItemType[];
	return [
		{
			name: "这是一个模块",
			description: "这是一个模块的描述",
			// files: Demo3DPreviewPanel,
			files
		}
	];
};
