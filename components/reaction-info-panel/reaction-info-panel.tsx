import { ReactReaction } from "#/reaction";
import { type NamedExoticComponent, useEffect, useState } from "react";
import type { Node } from "#/reaction/type";
import { IconNode, type IconNodeProps, MoleculeNode, type MoleculeNodeProps } from "#/reaction/nodes";
import { RiArrowRightLongLine, RiEditBoxLine, RiFindReplaceLine } from "@remixicon/react";
import { ReactionCondition, ReactionConditionImgCardList } from "#/reaction-info-panel/reaction-condition.tsx";
import type { ReactionInfo } from "@/pages/reaction/type.ts";
import { filterNodes, findArrowNode, mergeNodes } from "#/reaction-info-panel/tools.ts";
import { ReactionArrowCard, ReactionEditList } from "#/reaction-edit";
import { Tag } from "./tag";
import { useReactionEdit } from "#/reaction-info-panel/hook/use-reaction-edit.ts";
import { useReactionCondition } from "#/reaction-info-panel/hook/use-reaction-condition.ts";
import { getShortId } from "#/utils";
import { addNodesKey } from "#/reaction/toos.ts";
import { AutoResizeTextarea } from "#/reaction-info-panel/auto-resize-textarea.tsx";

const iconNode: NamedExoticComponent<IconNodeProps> = IconNode;
const moleculeNode: NamedExoticComponent<MoleculeNodeProps> = MoleculeNode;
const nodeTypes = {
	icon: iconNode,
	molecule: moleculeNode
};

type Props = ReactionInfo & {
	onEditChange: (state: boolean) => void;
	onSubmit: (info: ReactionInfo) => void;
};

const ReactionInfoPanel = (props: Props) => {
	const { reaction, condition, isEdit, state, onEditChange } = props;
	const [nodes, setNodes] = useState<Node[]>([]);
	const [arrowNode, setArrowNode] = useState<Node | null>(null);
	// reactantsCompounds
	const {
		compoundNode: reactantsNodes,
		setCompoundNode: setReactantsNodes,
		addCompoundNode: addReactantsNode,
		removeCompoundNode: removeReactantsNode
	} = useReactionEdit();

	// productsCompounds
	const {
		compoundNode: productsNodes,
		setCompoundNode: setProductsNodes,
		addCompoundNode: addProductsNode,
		removeCompoundNode: removeProductsNode
	} = useReactionEdit();

	// condition的内容处理
	const { conditionDescription, setConditionDescription, molCondition, setMolCondition, removeMolCondition } =
		useReactionCondition();
	useEffect(() => {
		if (!reaction) {
			return;
		}
		//TODO 转换数据格式, 这里可以增加一个函数, 把 data 转换为 Node[] 格式，
		setNodes(reaction);
		const arrow = findArrowNode(nodes);
		if (arrow) {
			setArrowNode(arrow);
		}
	}, [reaction]);

	useEffect(() => {
		if (isEdit) {
			// 根据nodes 拆分为反应物，产物，箭头
			const { arrow, reactants, products } = filterNodes(nodes);
			setReactantsNodes(reactants);
			setProductsNodes(products);
			setArrowNode(arrow);
			// 初始化condition的内容
			setConditionDescription(condition.description || "");
			setMolCondition(addNodesKey(condition.mol_condition || []));
		} else {
			const arrow = findArrowNode(nodes);
			if (arrow) {
				setArrowNode(arrow);
			}
		}
	}, [isEdit]);

	const reactantsAdd = () => {
		addReactantsNode({
			uid: getShortId(),
			data: {
				title: `${nodes.length + 1}}`,
				image:
					"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png"
			},
			type: "molecule"
		});
	};

	const productsAdd = () => {
		addProductsNode({
			uid: getShortId(),
			data: {
				title: `${nodes.length + 1}}`,
				image:
					"https://patmap.alphama.com.cn/resource/alm-app-platform/pdf/upload/2025/04/09/e475cd3ac00342bab01a4fd15a33acb7.pdf_position_pngs/59_448_937_503_1007.png"
			},
			type: "molecule"
		});
	};

	const handleCancel = () => {
		onEditChange(false);
	};

	const handleSubmit = () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { onSubmit, onEditChange, ...info } = props;
		console.log(info);
		const newInfo = {
			...info,
			condition: {
				description: conditionDescription,
				mol_condition: molCondition
			},
			reaction: mergeNodes(reactantsNodes, arrowNode, productsNodes),
			isEdit: false
		} as ReactionInfo;
		console.log(newInfo);
		onSubmit(newInfo);
	};

	if (isEdit) {
		return (
			<div className="w-full">
				<div className="flex gap-x-4">
					<div className="flex max-w-[520px] gap-x-5">
						<div className="flex-shrink-0">
							<Tag title="反应物" className="w-[72px] text-center" />
						</div>
						<ReactionEditList nodes={reactantsNodes} addClick={reactantsAdd} removeClick={removeReactantsNode} />
					</div>
					<div className="flex max-w-[520px] gap-x-5">
						<div className="flex-shrink-0">
							<Tag title="产物" className="w-[72px] text-center" />
						</div>
						<ReactionEditList nodes={productsNodes} addClick={productsAdd} removeClick={removeProductsNode} />
					</div>
				</div>
				<div className="mt-8 flex gap-x-5">
					<div>
						<Tag title="箭头" className="w-[72px] text-center" />
					</div>
					<div className="flex items-center gap-x-[10px]">
						<div className="h-[60px] w-[120px]">
							<ReactionArrowCard content={arrowNode ? <RiArrowRightLongLine /> : "添加箭头"} />
						</div>
						<button className="rounded-[4px] bg-[#F5F5F5] p-1">
							<RiEditBoxLine className="h-[14px] w-[14px]" />
						</button>
						<button className="rounded-[4px] bg-[#F5F5F5] p-1">
							<RiFindReplaceLine className="h-[14px] w-[14px]" />
						</button>
					</div>
				</div>
				<div className="mt-8 flex gap-x-5">
					<div>
						<Tag title="反应条件" className="w-[72px] text-center" />
					</div>
					<div className="min-w-0 flex-1">
						<div className="">
							<AutoResizeTextarea
								className="min-h-[44px] w-full resize-none overflow-hidden rounded-[4px] bg-[#F5F5F5] p-[10px] placeholder-[#999999] focus:outline-none"
								placeholder="请输入反应条件"
								value={conditionDescription}
								onChange={e => {
									setConditionDescription(e.target.value);
								}}
							/>
						</div>
						<ReactionConditionImgCardList data={molCondition} isDelete onDelete={removeMolCondition} />
					</div>
				</div>
				<div className="mt-[10px] flex items-center justify-end gap-x-5">
					<button className="rounded-[4px] bg-[#f5f5f5] px-[30px] py-[6px] text-[#999999]" onClick={handleCancel}>
						取消
					</button>
					<button className="rounded-[4px] bg-[#98C1FA] px-[30px] py-[6px] text-[#FFFFFF]" onClick={handleSubmit}>
						提交
					</button>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className="flex gap-x-2">
				<div className="min-w-0 flex-1">
					{state === "error" && <Tag title="异常反应" color="red" className="w-[72px] text-center" />}

					<ReactReaction nodes={nodes} nodeTypes={nodeTypes} className="cursor-pointer py-5" />
				</div>
				<div className="flex-shrink-0 py-5">
					<div className="cursor-pointer rounded-[4px] bg-[#F5F5F5] p-1" onClick={() => onEditChange(true)}>
						<RiEditBoxLine className="h-[14px] w-[14px]" />
					</div>
				</div>
			</div>
			<ReactionCondition info={condition} />
		</div>
	);
};

export { ReactionInfoPanel };
