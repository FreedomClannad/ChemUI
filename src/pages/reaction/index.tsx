import { type NamedExoticComponent, useEffect, useMemo, useState } from "react";
import { ReactReaction } from "#/reaction/react-reaction.tsx";
import type { Node } from "#/reaction/type.ts";
import { IconNode, type IconNodeProps, MoleculeNode, type MoleculeNodeProps } from "#/reaction/nodes";
import { ReactionDemoCompoundList, ReactionDemoList } from "@/pages/reaction/demo.ts";
import { ReactionArrowCard, ReactionCard } from "#/reaction-edit/card.tsx";
import { ReactionEditList } from "#/reaction-edit";
import { useReactionEdit } from "#/reaction-edit/hook/use-reaction-edit.ts";
import { ReactionInfoPanel } from "#/reaction-info-panel";

const createList = (): Node[] => {
	const list: Node[] = [];
	for (let i = 1; i <= 10; i++) {
		list.push({
			data: {
				type: "icon"
			},
			type: i % 2 === 0 ? "icon" : "molecule",
			id: `${i}`
		});
	}
	return list;
};
const iconNode: NamedExoticComponent<IconNodeProps> = IconNode;
const moleculeNode: NamedExoticComponent<MoleculeNodeProps> = MoleculeNode;
const nodeTypes = {
	icon: iconNode,
	molecule: moleculeNode
};

const ReactionPage = () => {
	const nodes = useMemo(() => {
		return ReactionDemoList;
	}, []);

	const { compoundList, setCompoundList, addCompound, removeCompound } = useReactionEdit();
	useEffect(() => {
		setCompoundList(ReactionDemoCompoundList);
	}, []);

	const addClick = () => {
		addCompound({
			id: "11",
			title: "新化合物",
			image:
				"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png"
		});
	};
	return (
		<>
			<div className="max-w-[600px]">
				<ReactReaction nodes={nodes} nodeTypes={nodeTypes} />
			</div>
			<div className="max-w-[600px]">
				<ReactionEditList
					compounds={compoundList}
					addInfo={{
						title: "名称",
						content: "添加"
					}}
					addClick={addClick}
					removeClick={removeCompound}
				/>
			</div>
			<div className="h-[60px] w-[120px]">
				<ReactionArrowCard />
			</div>
			<div className="mx-auto mt-10 w-[1000px]">
				<ReactionInfoPanel
					data={nodes}
					info={{
						state: "success",
						description:
							"中华人民共和国（the People's Republic of China），简称“中国”，成立于1949年10月1日 [1]，位于亚洲东部，太平洋西岸 [2]，是工人阶级领导的、以工农联盟为基础的人民民主专政的社会主义国家 [3]，以五星红旗为国旗 [4]、《义勇军进行曲》为国歌 [181]，国徽中间是五星照耀下的天安门，周围是谷穗和齿轮 [6] [164]，通用语言文字是普通话和规范汉字 [7]，首都北京 [8]，是一个以汉族为主体、56个民族共同组成的统一的多民族国家。\n" +
							"中国陆地面积约960万平方千米，东部和南部大陆海岸线1.8万多千米，海域总面积约473万平方千米 [2]。海域分布有大小岛屿7600多个，其中台湾岛最大，面积35759平方千米 [2]。中国同14国接壤，与8国海上相邻。省级行政区划为23个省、5个自治区、4个直辖市、2个特别行政区。 [2]\n" +
							"中国是世界上历史最悠久的国家之一，有着光辉灿烂的文化和光荣的革命传统 [3]，世界遗产数量全球领先 [9]。1949年新中国成立后，进入社会主义革命和建设时期，1956年实现向社会主义过渡，此后社会主义建设在探索中曲折发展 [10]。“文化大革命”结束后实行改革开放，沿着中国特色社会主义道路，集中力量进行社会主义现代化建设 [3]。经过长期努力，中国特色社会主义进入了新时代。 [11] [135]\n" +
							"截至2024年，中国是世界人口第二大国 [190]，国土面积居世界第三位，是世界第二大经济体，并持续成为世界经济增长最大的贡献者，2020年经济总量突破100万亿元 [12-13] [124]。中国坚持独立自主的和平外交政策，是联合国安全理事会常任理事国，也是许多国际组织的重要成员，被认为是潜在超级大国之一。 [14]",
						images: [
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png",
							"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png"
						]
					}}
				/>
			</div>
		</>
	);
};
export default ReactionPage;
