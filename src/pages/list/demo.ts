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
		visual_data: [
			{
				name: "Search Chembl",
				files: [
					{
						name: "Target Activities",
						path: "http://139.9.227.163/console/api/custom_tool_files?storage_file_path=custom_tools/2025-04-24/634bbee1-c7cf-4611-9be3-5bc359cd85ce.csv",
						type: "CSV",
						format: "csv",
						download_url:
							"http://139.9.227.163/console/api/custom_tool_files?storage_file_path=custom_tools/2025-04-24/634bbee1-c7cf-4611-9be3-5bc359cd85ce.csv"
					}
				],
				text: [
					{
						name: "Target Activities",
						content: [
							{
								"Target Name": "Melanocortin receptor 2",
								"Activity Type": "pKb",
								Relation: "=",
								Value: "9.5",
								Units: null,
								"Assay Description":
									"Antagonist activity at human MC2R expressed in CHO-K1 cells membrane assessed as cAMP accumulation preincubated for 30 mins followed by ACTH (1-24) addition and measured after 30 mins by HTRF based assay",
								"DOI/Patent ID": "DOI: 10.1021/acsmedchemlett.3c00514"
							},
							{
								"Target Name": "Melanocortin receptor 2",
								"Activity Type": "Kb",
								Relation: "=",
								Value: "0.34",
								Units: "nM",
								"Assay Description":
									"Antagonist activity at human MC2R expressed in CHO-K1 cells membrane assessed as cAMP accumulation preincubated for 30 mins followed by ACTH (1-24) addition and measured after 30 mins by HTRF based assay",
								"DOI/Patent ID": "DOI: 10.1021/acsmedchemlett.3c00514"
							},
							{
								"Target Name": "Unchecked",
								"Activity Type": "pKb",
								Relation: "=",
								Value: "9.6",
								Units: null,
								"Assay Description":
									"Antagonist activity at rat MC2R expressed in CHO-K1 cells membrane assessed as cAMP accumulation preincubated for 30 mins followed by ACTH (1-24) addition and measured after 30 mins by HTRF based assay",
								"DOI/Patent ID": "DOI: 10.1021/acsmedchemlett.3c00514"
							},
							{
								"Target Name": "Unchecked",
								"Activity Type": "Kb",
								Relation: "=",
								Value: "0.23",
								Units: "nM",
								"Assay Description":
									"Antagonist activity at rat MC2R expressed in CHO-K1 cells membrane assessed as cAMP accumulation preincubated for 30 mins followed by ACTH (1-24) addition and measured after 30 mins by HTRF based assay",
								"DOI/Patent ID": "DOI: 10.1021/acsmedchemlett.3c00514"
							},
							{
								"Target Name": "Melanocortin receptor 2",
								"Activity Type": "Ki",
								Relation: "=",
								Value: "1.995",
								Units: "nM",
								"Assay Description":
									"Displacement of [[125I]-Tyr23]-ACTH (1-39) from human MC2R incubated for 1.5 hrs by Topcount scintillation counting method",
								"DOI/Patent ID": "DOI: 10.1021/acsmedchemlett.3c00514"
							},
							{
								"Target Name": "Melanocortin receptor 2",
								"Activity Type": "Ki",
								Relation: "=",
								Value: "2.1",
								Units: "nM",
								"Assay Description":
									"Displacement of [[125I]-Tyr23]-ACTH (1-39) from human MC2R incubated for 1.5 hrs by Topcount scintillation counting method",
								"DOI/Patent ID": "DOI: 10.1021/acsmedchemlett.3c00514"
							},
							{
								"Target Name": "Unchecked",
								"Activity Type": "pKb",
								Relation: "=",
								Value: "9.6",
								Units: null,
								"Assay Description":
									"Antagonist activity at dog MC2R assessed as reduction in ACTH (1-24) stimulated cAMP accumulation",
								"DOI/Patent ID": "DOI: 10.1021/acsmedchemlett.3c00514"
							},
							{
								"Target Name": "Unchecked",
								"Activity Type": "Kb",
								Relation: "=",
								Value: "0.25",
								Units: "nM",
								"Assay Description":
									"Antagonist activity at dog MC2R assessed as reduction in ACTH (1-24) stimulated cAMP accumulation",
								"DOI/Patent ID": "DOI: 10.1021/acsmedchemlett.3c00514"
							},
							{
								"Target Name": "Melanocortin receptor 1",
								"Activity Type": "IC50",
								Relation: ">",
								Value: "10000.0",
								Units: "nM",
								"Assay Description": "Inhibition of human MC1R",
								"DOI/Patent ID": "DOI: 10.1021/acsmedchemlett.3c00514"
							},
							{
								"Target Name": "Melanocortin receptor 3",
								"Activity Type": "IC50",
								Relation: ">",
								Value: "10000.0",
								Units: "nM",
								"Assay Description": "Inhibition of human MC3R",
								"DOI/Patent ID": "DOI: 10.1021/acsmedchemlett.3c00514"
							},
							{
								"Target Name": "Melanocortin receptor 4",
								"Activity Type": "IC50",
								Relation: ">",
								Value: "10000.0",
								Units: "nM",
								"Assay Description": "Inhibition of human MC4R",
								"DOI/Patent ID": "DOI: 10.1021/acsmedchemlett.3c00514"
							},
							{
								"Target Name": "Melanocortin receptor 5",
								"Activity Type": "IC50",
								Relation: ">",
								Value: "10000.0",
								Units: "nM",
								"Assay Description": "Inhibition of human MC5R",
								"DOI/Patent ID": "DOI: 10.1021/acsmedchemlett.3c00514"
							},
							{
								"Target Name": "Serotonin 1b (5-HT1b) receptor",
								"Activity Type": "Inhibition",
								Relation: ">",
								Value: "70.0",
								Units: "%",
								"Assay Description": "Inhibition of 5-HT1B (unknown origin) at 10 uM relative to control",
								"DOI/Patent ID": "DOI: 10.1021/acsmedchemlett.3c00514"
							},
							{
								"Target Name": "Voltage-gated L-type calcium channel",
								"Activity Type": "Inhibition",
								Relation: ">",
								Value: "70.0",
								Units: "%",
								"Assay Description": "Inhibition of L-type calcium channel (unknown origin) at 10 uM relative to control",
								"DOI/Patent ID": "DOI: 10.1021/acsmedchemlett.3c00514"
							},
							{
								"Target Name": "Unchecked",
								"Activity Type": "Inhibition",
								Relation: ">",
								Value: "70.0",
								Units: "%",
								"Assay Description": "Inhibition of sodium channel (unknown origin) at 10 uM relative to control",
								"DOI/Patent ID": "DOI: 10.1021/acsmedchemlett.3c00514"
							},
							{
								"Target Name": "Serotonin 1b (5-HT1b) receptor",
								"Activity Type": "IC50",
								Relation: "=",
								Value: "750.0",
								Units: "nM",
								"Assay Description": "Antagonist activity at 5-HT1B (unknown origin)",
								"DOI/Patent ID": "DOI: 10.1021/acsmedchemlett.3c00514"
							},
							{
								"Target Name": "Unchecked",
								"Activity Type": "Ratio IC50",
								Relation: ">",
								Value: "2500.0",
								Units: null,
								"Assay Description": "Selectivity ratio of IC50 for 5-HT1B (unknown origin) to IC50 for human MC2R",
								"DOI/Patent ID": "DOI: 10.1021/acsmedchemlett.3c00514"
							},
							{
								"Target Name": "Unchecked",
								"Activity Type": "Activity",
								Relation: "=",
								Value: "44.0",
								Units: "%",
								"Assay Description":
									"In vivo antagonist activity at MC2R in Sprague-Dawley rat assessed as reduction in ACTH-stimulated corticosterone secretion at 3 mg/kg, po administered as single dose and measured after 1 hr by LC-MS/MS analysis",
								"DOI/Patent ID": "DOI: 10.1021/acsmedchemlett.3c00514"
							},
							{
								"Target Name": "Unchecked",
								"Activity Type": "Activity",
								Relation: "=",
								Value: "88.0",
								Units: "%",
								"Assay Description":
									"In vivo antagonist activity at MC2R in Sprague-Dawley rat assessed as reduction in ACTH-stimulated corticosterone secretion at 30 mg/kg, po administered as single dose and measured after 1 hr by LC-MS/MS analysis",
								"DOI/Patent ID": "DOI: 10.1021/acsmedchemlett.3c00514"
							},
							{
								"Target Name": "Unchecked",
								"Activity Type": "Activity",
								Relation: "=",
								Value: "36.0",
								Units: "%",
								"Assay Description":
									"In vivo antagonist activity at MC2R in Sprague-Dawley rat assessed as reduction in ACTH-stimulated corticosterone secretion at 3 mg/kg, po administered as single dose and measured after 4 hrs by LC-MS/MS analysis",
								"DOI/Patent ID": "DOI: 10.1021/acsmedchemlett.3c00514"
							},
							{
								"Target Name": "Unchecked",
								"Activity Type": "Activity",
								Relation: "=",
								Value: "84.0",
								Units: "%",
								"Assay Description":
									"In vivo antagonist activity at MC2R in Sprague-Dawley rat assessed as reduction in ACTH-stimulated corticosterone secretion at 30 mg/kg, po administered as single dose and measured after 4 hrs by LC-MS/MS analysis",
								"DOI/Patent ID": "DOI: 10.1021/acsmedchemlett.3c00514"
							},
							{
								"Target Name": "Unchecked",
								"Activity Type": "Activity",
								Relation: null,
								Value: null,
								Units: null,
								"Assay Description":
									"In vivo antagonist activity at MC2R in Sprague-Dawley rat assessed as reduction in ACTH-stimulated corticosterone secretion at 3 to 30 mg/kg, po administered as single dose and measured after 24 to 48 hrs by LC-MS/MS analysis",
								"DOI/Patent ID": "DOI: 10.1021/acsmedchemlett.3c00514"
							}
						]
					}
				]
			}
		],
		download_url:
			"http://139.9.227.163/console/api/custom_tool_files?storage_file_path=custom_tools/2025-04-24/b4cc2451-c583-45ed-b7da-8f303d36445b.zip"
	}
];
