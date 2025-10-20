import type { Node } from "#/reaction/type.ts";
const ReactionDemoList: Node[] = [
	{
		id: "1",
		data: {
			title: "H2O",
			image:
				"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/2_187_184_429_351.png"
		},
		type: "molecule"
	},
	{
		id: "2",
		data: {
			type: "add"
		},
		type: "icon"
	},
	{
		id: "3",
		data: {
			title: "O2",
			image:
				"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/3_188_398_428_565.png"
		},
		type: "molecule"
	},
	{
		id: "4",
		data: {
			type: "add"
		},
		type: "icon"
	},
	{
		id: "5",
		data: {
			title: "CH4",
			image:
				"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/3_187_672_429_837.png"
		},
		type: "molecule"
	},
	{
		id: "6",
		data: {
			type: "arrow"
		},
		type: "icon"
	},
	{
		id: "7",
		data: {
			title: "CO",
			image:
				"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/8_245_1126_487_1291.png"
		},
		type: "molecule"
	},
	{
		id: "8",
		data: {
			type: "add"
		},
		type: "icon"
	},
	{
		id: "9",
		data: {
			title: "SO2",
			image:
				"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/26_246_111_553_331.png"
		},
		type: "molecule"
	},
	{
		id: "10",
		data: {
			type: "add"
		},
		type: "icon"
	},
	{
		id: "11",
		data: {
			title: "NaOH",
			image:
				"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/39_245_1126_485_1292.png"
		},
		type: "molecule"
	},
	{
		id: "12",
		data: {
			type: "add"
		},
		type: "icon"
	},
	{
		id: "13",
		data: {
			title: "NaOH",
			image:
				"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png"
		},
		type: "molecule"
	}
];

const ReactionDemoCompoundList = ReactionDemoList.filter(node => node.type === "molecule").map(node => {
	return {
		id: node.id,
		...node.data
	};
});

export { ReactionDemoList, ReactionDemoCompoundList };
