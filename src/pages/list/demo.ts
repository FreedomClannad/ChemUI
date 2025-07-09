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

export const DemoText = [
	{
		name: "这是一个模块",
		description: "这是一个模块的描述",
		// files: Demo3DPreviewPanel,
		files: [
			{
				type: ChemUIListTypeEnum.TEXT,
				name: "这是CSV内容",
				path: "http://localhost:5500/test2.txt",
				format: "csv",
				download_url: "http://localhost:5500/test2.txt"
			}
		]
	}
];

export const DemoCSV = [
	{
		name: "这是一个模块",
		description: "这是一个模块的描述",
		// files: Demo3DPreviewPanel,
		files: [
			{
				name: "Target Activities",
				path: "http://139.9.227.163/console/api/custom_tool_files?storage_file_path=custom_tools/2025-04-24/634bbee1-c7cf-4611-9be3-5bc359cd85ce.csv",
				type: "CSV",
				format: "csv",
				download_url:
					"http://139.9.227.163/console/api/custom_tool_files?storage_file_path=custom_tools/2025-04-24/634bbee1-c7cf-4611-9be3-5bc359cd85ce.csv"
			}
		]
	}
];

export const DemoCSVSmiles = {
	visual_data: [
		{
			name: "ADMET Predictor",
			files: [
				{
					name: "CSV File",
					path: "http://139.9.227.163/console/api/custom_tool_files?storage_file_path=custom_tools/2025-06-13/ADMET_Predictor_5416cf75-493f-4351-8764-4b15f4de8b56.csv",
					type: "CSV",
					format: "CSV",
					download_url:
						"http://139.9.227.163/console/api/custom_tool_files?storage_file_path=custom_tools/2025-06-13/ADMET_Predictor_5416cf75-493f-4351-8764-4b15f4de8b56.csv"
				}
			]
		}
	],
	download_url:
		"http://139.9.227.163/console/api/custom_tool_files?storage_file_path=custom_tools/2025-06-13/ADMET_Predictor_c40af49d-e156-4277-8326-695d2e6b3bc9.zip"
};

export const Demo3DPreview = [
	{
		name: "这是一个模块",
		description: "这是一个模块的描述",
		files: [
			{
				type: ChemUIListTypeEnum.MOLSTAR_PANEL_PICKER,
				name: "这是3D内容",
				path: [
					{
						name: "测试名字1测试名字1测试名字1测试名字1测试名字1测试名字1测试名字1测试名字1测试名字1测试名字1测试名字1测试名字1测试名字1测试名字1测试名字1测试名字1测试名字1测试名字1测试名字1测试名字1测试名字1测试名字1测试名字1",
						path: "http://localhost:5500/pdb/1.pdb",
						format: "pdb",
						smiles: "https://patmap.alphama.com.cn/prod-api/profile/csr/2025/06/06/ce254b35-e580-446f-8632-b66eadb4f894.svg"
					},
					{
						name: "测试名字2",
						path: "http://localhost:5500/pdb/2.pdb",
						format: "pdb",
						smiles: "https://patmap.alphama.com.cn/prod-api/profile/csr/2025/06/06/ce254b35-e580-446f-8632-b66eadb4f894.svg"
					},
					{
						name: "测试名字3",
						path: "http://localhost:5500/pdb/3.pdb",
						format: "pdb",
						smiles: "https://patmap.alphama.com.cn/prod-api/profile/csr/2025/06/06/ce254b35-e580-446f-8632-b66eadb4f894.svg"
					},
					{
						name: "测试名字4",
						path: "http://localhost:5500/pdb/4.pdb",
						format: "pdb",
						smiles: "https://patmap.alphama.com.cn/prod-api/profile/csr/2025/06/06/ce254b35-e580-446f-8632-b66eadb4f894.svg"
					},
					{
						name: "测试名字5",
						path: "http://localhost:5500/pdb/5.pdb",
						format: "pdb",
						smiles: "https://patmap.alphama.com.cn/prod-api/profile/csr/2025/06/06/ce254b35-e580-446f-8632-b66eadb4f894.svg"
					},
					{
						name: "测试名字6",
						path: "http://localhost:5500/pdb/6.pdb",
						format: "pdb",
						smiles: "https://patmap.alphama.com.cn/prod-api/profile/csr/2025/06/06/ce254b35-e580-446f-8632-b66eadb4f894.svg"
					},
					{
						name: "测试名字7",
						path: "http://localhost:5500/pdb/7.pdb",
						format: "pdb",
						smiles: "https://patmap.alphama.com.cn/prod-api/profile/csr/2025/06/06/ce254b35-e580-446f-8632-b66eadb4f894.svg"
					},
					{
						name: "测试名字8",
						path: "http://localhost:5500/pdb/8.pdb",
						format: "pdb",
						smiles: "https://patmap.alphama.com.cn/prod-api/profile/csr/2025/06/06/ce254b35-e580-446f-8632-b66eadb4f894.svg"
					},
					{
						name: "测试名字9",
						path: "http://localhost:5500/pdb/9.pdb",
						format: "pdb",
						smiles: "https://patmap.alphama.com.cn/prod-api/profile/csr/2025/06/06/ce254b35-e580-446f-8632-b66eadb4f894.svg"
					},
					{
						name: "测试名字10",
						path: "http://localhost:5500/pdb/10.pdb",
						format: "pdb",
						smiles: "https://patmap.alphama.com.cn/prod-api/profile/csr/2025/06/06/ce254b35-e580-446f-8632-b66eadb4f894.svg"
					},
					{
						name: "测试名字11",
						path: "http://localhost:5500/pdb/1.pdb",
						format: "pdb",
						smiles: "https://patmap.alphama.com.cn/prod-api/profile/csr/2025/06/06/ce254b35-e580-446f-8632-b66eadb4f894.svg"
					},
					{
						name: "测试名字12",
						path: "http://localhost:5500/pdb/2.pdb",
						format: "pdb",
						smiles: "https://patmap.alphama.com.cn/prod-api/profile/csr/2025/06/06/ce254b35-e580-446f-8632-b66eadb4f894.svg"
					},
					{
						name: "测试名字13",
						path: "http://localhost:5500/pdb/3.pdb",
						format: "pdb",
						smiles: "https://patmap.alphama.com.cn/prod-api/profile/csr/2025/06/06/ce254b35-e580-446f-8632-b66eadb4f894.svg"
					},
					{
						name: "测试名字14",
						path: "http://localhost:5500/pdb/4.pdb",
						format: "pdb",
						smiles: "https://patmap.alphama.com.cn/prod-api/profile/csr/2025/06/06/ce254b35-e580-446f-8632-b66eadb4f894.svg"
					},
					{
						name: "测试名字15",
						path: "http://localhost:5500/pdb/5.pdb",
						format: "pdb",
						smiles: "https://patmap.alphama.com.cn/prod-api/profile/csr/2025/06/06/ce254b35-e580-446f-8632-b66eadb4f894.svg"
					},
					{
						name: "测试名字16",
						path: "http://localhost:5500/pdb/6.pdb",
						format: "pdb",
						smiles: "https://patmap.alphama.com.cn/prod-api/profile/csr/2025/06/06/ce254b35-e580-446f-8632-b66eadb4f894.svg"
					}
				],
				format: "pdb",
				description:
					"中华人民共和国（the People's Republic of China），简称“中国”，成立于1949年10月1日 [1]，位于亚洲东部，太平洋西岸 [2]，是工人阶级领导的、以工农联盟为基础的人民民主专政的社会主义国家 [3]，以五星红旗为国旗 [4]、《义勇军进行曲》为国歌 [181]，国徽中间是五星照耀下的天安门，周围是谷穗和齿轮 [6] [164]，通用语言文字是普通话和规范汉字 [7]，首都北京 [8]，是一个以汉族为主体、56个民族共同组成的统一的多民族国家。\n" +
					"中国陆地面积约960万平方千米，东部和南部大陆海岸线1.8万多千米，海域总面积约473万平方千米 [2]。海域分布有大小岛屿7600多个，其中台湾岛最大，面积35798平方千米 [2]。中国同14国接壤，与8国海上相邻。省级行政区划为23个省、5个自治区、4个直辖市、2个特别行政区。 [2]\n" +
					"中国是世界上历史最悠久的国家之一，有着光辉灿烂的文化和光荣的革命传统 [3]，世界遗产数量全球领先 [9]。1949年新中国成立后，进入社会主义革命和建设时期，1956年实现向社会主义过渡，此后社会主义建设在探索中曲折发展 [10]。“文化大革命”结束后实行改革开放，沿着中国特色社会主义道路，集中力量进行社会主义现代化建设 [3]。经过长期努力，中国特色社会主义进入了新时代。 [11] [135]\n" +
					"中国是世界上人口最多的发展中国家，国土面积居世界第三位，是世界第二大经济体，并持续成为世界经济增长最大的贡献者，2020年经济总量突破100万亿元 [12-13] [124]。中国坚持独立自主的和平外交政策，是联合国安全理事会常任理事国，也是许多国际组织的重要成员，被认为是潜在超级大国之一。 "
			}
		]
	}
];

export const Demo3DSEQ = [
	{
		name: "这是一个模块",
		description: "这是一个模块的描述",
		files: [
			{
				type: ChemUIListTypeEnum.MOLSTAR_SEQ,
				name: "这是3D内容",
				path: "http://localhost:5500/proteins.pdb",
				format: "pdb",
				description:
					"中华人民共和国（the People's Republic of China），简称“中国”，成立于1949年10月1日 [1]，位于亚洲东部，太平洋西岸 [2]，是工人阶级领导的、以工农联盟为基础的人民民主专政的社会主义国家 [3]，以五星红旗为国旗 [4]、《义勇军进行曲》为国歌 [181]，国徽中间是五星照耀下的天安门，周围是谷穗和齿轮 [6] [164]，通用语言文字是普通话和规范汉字 [7]，首都北京 [8]，是一个以汉族为主体、56个民族共同组成的统一的多民族国家。\n" +
					"中国陆地面积约960万平方千米，东部和南部大陆海岸线1.8万多千米，海域总面积约473万平方千米 [2]。海域分布有大小岛屿7600多个，其中台湾岛最大，面积35798平方千米 [2]。中国同14国接壤，与8国海上相邻。省级行政区划为23个省、5个自治区、4个直辖市、2个特别行政区。 [2]\n" +
					"中国是世界上历史最悠久的国家之一，有着光辉灿烂的文化和光荣的革命传统 [3]，世界遗产数量全球领先 [9]。1949年新中国成立后，进入社会主义革命和建设时期，1956年实现向社会主义过渡，此后社会主义建设在探索中曲折发展 [10]。“文化大革命”结束后实行改革开放，沿着中国特色社会主义道路，集中力量进行社会主义现代化建设 [3]。经过长期努力，中国特色社会主义进入了新时代。 [11] [135]\n" +
					"中国是世界上人口最多的发展中国家，国土面积居世界第三位，是世界第二大经济体，并持续成为世界经济增长最大的贡献者，2020年经济总量突破100万亿元 [12-13] [124]。中国坚持独立自主的和平外交政策，是联合国安全理事会常任理事国，也是许多国际组织的重要成员，被认为是潜在超级大国之一。 "
			}
		]
	}
];

export const Demo3D = [
	{
		name: "这是一个模块",
		description: "这是一个模块的描述",
		files: [
			{
				type: ChemUIListTypeEnum.MOLSTAR,
				name: "这是3D内容",
				path: "http://localhost:5500/proteins.pdb",
				format: "pdb",
				description:
					"中华人民共和国（the People's Republic of China），简称“中国”，成立于1949年10月1日 [1]，位于亚洲东部，太平洋西岸 [2]，是工人阶级领导的、以工农联盟为基础的人民民主专政的社会主义国家 [3]，以五星红旗为国旗 [4]、《义勇军进行曲》为国歌 [181]，国徽中间是五星照耀下的天安门，周围是谷穗和齿轮 [6] [164]，通用语言文字是普通话和规范汉字 [7]，首都北京 [8]，是一个以汉族为主体、56个民族共同组成的统一的多民族国家。\n" +
					"中国陆地面积约960万平方千米，东部和南部大陆海岸线1.8万多千米，海域总面积约473万平方千米 [2]。海域分布有大小岛屿7600多个，其中台湾岛最大，面积35798平方千米 [2]。中国同14国接壤，与8国海上相邻。省级行政区划为23个省、5个自治区、4个直辖市、2个特别行政区。 [2]\n" +
					"中国是世界上历史最悠久的国家之一，有着光辉灿烂的文化和光荣的革命传统 [3]，世界遗产数量全球领先 [9]。1949年新中国成立后，进入社会主义革命和建设时期，1956年实现向社会主义过渡，此后社会主义建设在探索中曲折发展 [10]。“文化大革命”结束后实行改革开放，沿着中国特色社会主义道路，集中力量进行社会主义现代化建设 [3]。经过长期努力，中国特色社会主义进入了新时代。 [11] [135]\n" +
					"中国是世界上人口最多的发展中国家，国土面积居世界第三位，是世界第二大经济体，并持续成为世界经济增长最大的贡献者，2020年经济总量突破100万亿元 [12-13] [124]。中国坚持独立自主的和平外交政策，是联合国安全理事会常任理事国，也是许多国际组织的重要成员，被认为是潜在超级大国之一。 "
			}
		]
	}
];

export const DemoMarkdown = [
	{
		name: "这是一个模块",
		description: "这是一个模块的描述",
		files: [
			{
				type: ChemUIListTypeEnum.MARKDOWN,
				name: "这是3D内容",
				path: "http://localhost:5500/README.md",
				format: "pdb",
				description:
					"中华人民共和国（the People's Republic of China），简称“中国”，成立于1949年10月1日 [1]，位于亚洲东部，太平洋西岸 [2]，是工人阶级领导的、以工农联盟为基础的人民民主专政的社会主义国家 [3]，以五星红旗为国旗 [4]、《义勇军进行曲》为国歌 [181]，国徽中间是五星照耀下的天安门，周围是谷穗和齿轮 [6] [164]，通用语言文字是普通话和规范汉字 [7]，首都北京 [8]，是一个以汉族为主体、56个民族共同组成的统一的多民族国家。\n" +
					"中国陆地面积约960万平方千米，东部和南部大陆海岸线1.8万多千米，海域总面积约473万平方千米 [2]。海域分布有大小岛屿7600多个，其中台湾岛最大，面积35798平方千米 [2]。中国同14国接壤，与8国海上相邻。省级行政区划为23个省、5个自治区、4个直辖市、2个特别行政区。 [2]\n" +
					"中国是世界上历史最悠久的国家之一，有着光辉灿烂的文化和光荣的革命传统 [3]，世界遗产数量全球领先 [9]。1949年新中国成立后，进入社会主义革命和建设时期，1956年实现向社会主义过渡，此后社会主义建设在探索中曲折发展 [10]。“文化大革命”结束后实行改革开放，沿着中国特色社会主义道路，集中力量进行社会主义现代化建设 [3]。经过长期努力，中国特色社会主义进入了新时代。 [11] [135]\n" +
					"中国是世界上人口最多的发展中国家，国土面积居世界第三位，是世界第二大经济体，并持续成为世界经济增长最大的贡献者，2020年经济总量突破100万亿元 [12-13] [124]。中国坚持独立自主的和平外交政策，是联合国安全理事会常任理事国，也是许多国际组织的重要成员，被认为是潜在超级大国之一。 "
			}
		]
	}
];

export const Demo2D = [
	{
		name: "这是一个模块",
		description: "这是一个模块的描述",
		files: [
			{
				type: ChemUIListTypeEnum.KETCHER,
				name: "这是3D内容",
				path: "http://localhost:5500/2d-mol.mol",
				format: "pdb",
				description:
					"中华人民共和国（the People's Republic of China），简称“中国”，成立于1949年10月1日 [1]，位于亚洲东部，太平洋西岸 [2]，是工人阶级领导的、以工农联盟为基础的人民民主专政的社会主义国家 [3]，以五星红旗为国旗 [4]、《义勇军进行曲》为国歌 [181]，国徽中间是五星照耀下的天安门，周围是谷穗和齿轮 [6] [164]，通用语言文字是普通话和规范汉字 [7]，首都北京 [8]，是一个以汉族为主体、56个民族共同组成的统一的多民族国家。\n" +
					"中国陆地面积约960万平方千米，东部和南部大陆海岸线1.8万多千米，海域总面积约473万平方千米 [2]。海域分布有大小岛屿7600多个，其中台湾岛最大，面积35798平方千米 [2]。中国同14国接壤，与8国海上相邻。省级行政区划为23个省、5个自治区、4个直辖市、2个特别行政区。 [2]\n" +
					"中国是世界上历史最悠久的国家之一，有着光辉灿烂的文化和光荣的革命传统 [3]，世界遗产数量全球领先 [9]。1949年新中国成立后，进入社会主义革命和建设时期，1956年实现向社会主义过渡，此后社会主义建设在探索中曲折发展 [10]。“文化大革命”结束后实行改革开放，沿着中国特色社会主义道路，集中力量进行社会主义现代化建设 [3]。经过长期努力，中国特色社会主义进入了新时代。 [11] [135]\n" +
					"中国是世界上人口最多的发展中国家，国土面积居世界第三位，是世界第二大经济体，并持续成为世界经济增长最大的贡献者，2020年经济总量突破100万亿元 [12-13] [124]。中国坚持独立自主的和平外交政策，是联合国安全理事会常任理事国，也是许多国际组织的重要成员，被认为是潜在超级大国之一。 "
			}
		]
	}
];

export const DemoTable = [
	{
		name: "这是一个模块",
		description: "这是一个模块的描述",
		files: [
			{
				type: ChemUIListTypeEnum.TABLE,
				name: "这是表格内容",
				path: "http://localhost:5500/tabs-table.json",
				format: "img",
				download_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
			},
			{
				type: ChemUIListTypeEnum.TABLE,
				name: "这是表格内容",
				path: "http://localhost:5500/base-table.json",
				format: "img",
				download_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
			},
			{
				type: ChemUIListTypeEnum.TABLE,
				name: "这是表格内容",
				path: "http://localhost:5500/molTabsTable.json",
				format: "img",
				download_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
			},
			{
				type: ChemUIListTypeEnum.TABLE,
				name: "这是表格内容",
				path: "http://localhost:5500/molBaseView.json",
				format: "img",
				download_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
			}
		]
	}
];
