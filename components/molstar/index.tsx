import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import "molstar/build/viewer/molstar.css";
import "./styles.css";
import { PluginStateObject } from "molstar/lib/mol-plugin-state/objects";
import { OrderedSet } from "molstar/lib/mol-data/int";
import { StructureElement } from "molstar/lib/mol-model/structure";
import { Sphere3D } from "molstar/lib/mol-math/geometry";
import { Loci } from "molstar/lib/mol-model/loci";
import { initOptions } from "./function";
import type { LoadFileData, LoadFileURL, SinglePolymerAndLigandShowOrHideType } from "./viewer";
import { Viewer } from "./viewer";
import { getShortId } from "#/utils";
import {
	type interactions,
	InteractionsEnum,
	type interactionsKeys,
	type MolstarBoxAttribute,
	type MolstarCenterPosition
} from "#/molstar/types";
import { MolstarPubSub } from "#/pubsub";

export type ViewerOptions = {
	layoutIsExpanded?: boolean;
	layoutShowControls?: boolean;
	layoutShowRemoteState?: boolean;
	layoutShowSequence?: boolean;
	layoutShowLog?: boolean;
	layoutShowLeftPanel?: boolean;
	layoutShowRightPanel?: boolean;

	viewportShowExpand?: boolean;
	viewportShowSelectionMode?: boolean;
	viewportShowAnimation?: boolean;
	viewportShowControls?: boolean;
	viewportShowSettings?: boolean;
	viewportShowTrajectoryControls?: boolean;
};

type Props = {
	id?: string;
	options?: ViewerOptions;
	isInteraction?: boolean;
	onFocusCenter?: (center: { x: number; y: number; z: number; num: string; chain: string; label: string }) => void;
	onLoad?: () => void;
	isDrawBox?: boolean;
	boxAttribute?: MolstarBoxAttribute;
};

export type MolstarHandle = {
	loadStructureFromUrl: (loadFileURL: LoadFileURL, index: number) => Promise<any> | null;
	loadStructureFromData: (loadFileData: LoadFileData, index: number) => Promise<any> | null;
	loadStructuresFromUrlsAndMerge: (params: SinglePolymerAndLigandShowOrHideType) => void;
	deletedStructure: (name_id: string) => void;
	// deleted: () => void
	drawBox: (center?: MolstarCenterPosition) => void;
	// drawBox2pos: (isshow: boolean, boxAttribute: MolstarBoxAttribute | undefined) => void
	updatebox: () => void;
	// singleshoworhide: () => void
	mergeShowHide: (name_id: string, isshow: boolean) => void;
	// mergeshoworhide: () => void
	exportmodels: () => void;
	setStructureVisibility: (index: number, visible: boolean) => void;
	getCenter: () => Promise<{ x: number; y: number; z: number; num: string; chain: string; label: string } | null | undefined>;
	clear: () => void;
	isLoad: () => boolean;
	test: () => void;
	setInteraction: (ionic: boolean) => void;
	focusClicked: () => void;
};
const MolstarViewer = forwardRef<MolstarHandle, Props>((props, ref) => {
	const { id = getShortId(), options, isInteraction = true, onFocusCenter, onLoad, isDrawBox = false, boxAttribute } = props;
	const molstart = useRef<Viewer | null>(null);
	const [isMolLoad, setIsMolLoad] = useState<boolean>(false);
	// 通过控制boolean来刷新组件
	const [isRefresh, setIsRefresh] = useState<boolean>(false);
	const getCenter = async () => {
		if (molstart && molstart.current) {
			const center = molstart.current.getFocusedResidueCenter();
			if (center) {
				const { x, y, z, num, chain, indexArray } = center;
				const label = molstart.current?.getFocusedPolymer(indexArray) || "";
				return { x, y, z, num, chain, label };
			}
			return undefined;
		}
	};
	const isDrawBoxRef = useRef<boolean>(isDrawBox);
	const boxAttributeRef = useRef<MolstarBoxAttribute | undefined>(undefined);
	const drawBox = async (center?: MolstarCenterPosition) => {
		if (molstart && molstart.current && isDrawBoxRef && isDrawBoxRef.current) {
			const drawbox = await molstart.current?.Draw3DBox(isDrawBoxRef.current, boxAttributeRef.current, center);
			return drawbox;
		}
		return null;
	};

	// const drawBox2pos = async (isshow: boolean, boxAttribute: MolstarBoxAttribute | undefined) => {
	//   console.log(isDrawBoxRef.current)
	//   if (molstart && molstart.current) {
	//     console.log('画框')
	//     const drawbox = await molstart.current?.Draw3DBox(isshow, boxAttribute)
	//     return drawbox
	//   }
	//   return null
	// }

	const drawBoxClear = async () => {
		if (molstart && molstart.current) {
			await molstart.current?.Draw3DBoxClear();
		}
	};

	const updatebox = async () => {
		if (molstart && molstart.current && boxAttributeRef.current) {
			const updatabox = await molstart.current?.updataBox(boxAttributeRef.current);
			return updatabox;
		}
	};

	useEffect(() => {
		if (boxAttribute) updatebox().then();
		boxAttributeRef.current = boxAttribute;
	}, [boxAttribute]);

	useEffect(() => {
		Viewer.create(id, {
			layoutIsExpanded: false,
			layoutShowControls: true,
			layoutShowRemoteState: false,
			layoutShowSequence: true,
			layoutShowLog: false,
			layoutShowLeftPanel: false,
			layoutShowRightPanel: false,

			viewportShowExpand: false,
			viewportShowSelectionMode: false,
			viewportShowAnimation: false,
			viewportShowControls: false,
			viewportShowSettings: false,
			viewportShowTrajectoryControls: true, // 多个分子控制左右切换
			volumeStreamingServer: "https://maps.rcsb.org",
			...options
		}).then(res => {
			molstart.current = res;
			setTimeout(() => {
				onLoad?.();
				setIsMolLoad(true);
			}, 500);

			// ViewerStart = res;
		});
	}, []);
	const focusClicked = () => {
		setTimeout(async () => {
			const center = await getCenter();
			onFocusCenter?.(center as { x: number; y: number; z: number; num: string; chain: string; label: string });
			drawBox(center).then();
		}, 500);
	};

	useEffect(() => {
		isDrawBoxRef.current = isDrawBox;
		if (isDrawBox) drawBox().then();
		else drawBoxClear().then();
	}, [isDrawBox]);

	useEffect(() => {
		MolstarPubSub.subscribe("molstar-focus-clicked", focusClicked);
		return () => {
			MolstarPubSub.unsubscribe("molstar-focus-clicked", focusClicked);
		};
	}, []);

	function isLikelyLigand(compId: string): boolean {
		const excludeList = [
			"SO4",
			"PO4",
			"GOL",
			"EDO",
			"NAG",
			"MAN",
			"FUC",
			"NAD",
			"NADP",
			"FAD",
			"FMN",
			"ATP",
			"ADP",
			"GTP",
			"GDP",
			"CTP",
			"CDP",
			"NA",
			"CL",
			"ZN",
			"CA",
			"MG",
			"FE",
			"CU",
			"MN",
			"K",
			"HEM",
			"SF4",
			"F3S",
			"DMS",
			"TPO",
			"SEP",
			"PTR",
			"MSE",
			"CSO",
			"HYP",
			"MLY",
			"CSD",
			"CME",
			"KCX",
			"CAS",
			"MK8",
			"NEP",
			"NLN",
			"LLP",
			"DAL",
			"TYS",
			"OCS",
			"CSX",
			"SNN",
			"HOH",
			"WAT"
		];
		return !excludeList.includes(compId);
	}

	const handleFocusCenter = async (index = 0) => {
		if (molstart && molstart.current) {
			// 获取结构的边界信息
			const structure = molstart.current.plugin.managers.structure.hierarchy.current.structures[index];
			const ligand_cell = structure.components?.filter(cell => cell.key?.includes("ligand"));
			const non_standard_cell = structure.components?.filter(cell => cell.key?.includes("non-standard"));
			// 如果non_standard_cell存在,判断non_standard_cell是否符合ligand标准
			if (non_standard_cell && non_standard_cell.length > 0) {
				const loadedStructure = non_standard_cell[0].cell.obj?.data;
				const compIds: string[][] = [];
				if (loadedStructure) {
					for (const unit of loadedStructure.units) {
						const compIdColumn = unit.model.atomicHierarchy.atoms.label_comp_id;
						const column = [] as any[];
						for (const element of unit.elements) {
							const compId = compIdColumn.value(element);
							column.push(compId);
						}
						compIds.push(column);
					}
					const ligandIds = compIds
						.map((unitCompIds, index) => (unitCompIds.some(isLikelyLigand) ? index : -1))
						.filter(index => index !== -1);
					// 如果符合，将其填入到ligand_cell中
					if (ligandIds.length > 0) {
						ligandIds.forEach(index => {
							const unit = non_standard_cell[index].cell.obj?.data.units;
							console.log("index", non_standard_cell[index]);
							if (unit) {
								const mergefList = [...loadedStructure.units, ...unit];
								if (mergefList && molstart && molstart.current) {
									const unitWithMostElements = mergefList.reduce((maxUnit, currentUnit) => {
										return currentUnit.elements.length > maxUnit.elements.length ? currentUnit : maxUnit;
									}, mergefList[0]);

									const indices = OrderedSet.ofSortedArray(unitWithMostElements.elements);
									const elements = [
										{
											unit: unitWithMostElements,
											indices
										}
									];
									const loci = StructureElement.Loci(structure.cell.obj?.data, elements);
									const sphere = Loci.getBoundingSphere(loci) || Sphere3D();
									const boundary = unitWithMostElements.boundary.sphere;
									const { center, radius } = boundary;
									sphere.center = center;
									sphere.radius = radius;
									molstart.current.plugin.managers.camera.focusSphere(sphere);
									molstart.current.plugin.managers.structure.focus.setFromLoci(loci);
								}
							}
						});
					}
				}
			} else {
				if (ligand_cell && ligand_cell.length > 0) {
					const loadedStructure = ligand_cell[0].cell.obj?.data;
					if (loadedStructure) {
						const unitWithMostElements = loadedStructure.units.reduce((maxUnit, currentUnit) => {
							return currentUnit.elements.length > maxUnit.elements.length ? currentUnit : maxUnit;
						}, loadedStructure.units[0]);

						const indices = OrderedSet.ofSortedArray(unitWithMostElements.elements);
						const elements = [
							{
								unit: unitWithMostElements,
								indices
							}
						];
						const loci = StructureElement.Loci(structure.cell.obj?.data, elements);
						const sphere = Loci.getBoundingSphere(loci) || Sphere3D();
						const boundary = unitWithMostElements.boundary.sphere;
						const { center, radius } = boundary;
						sphere.center = center;
						sphere.radius = radius;
						molstart.current.plugin.managers.camera.focusSphere(sphere);
						molstart.current.plugin.managers.structure.focus.setFromLoci(loci);
					}
				}
			}
		}
	};

	// 加载模型
	const loadStructureFromUrl = async (loadFileURL: LoadFileURL, index: number) => {
		if (molstart && molstart.current) {
			const structureHierarchy = await molstart.current.loadStructureFromUrl(loadFileURL);
			await handleFocusCenter(index);

			return structureHierarchy;
		}
		return null;
	};

	// 控制合并后的显隐
	const mergeShowHide = (name_id: string, isshow: boolean) => {
		if (molstart && molstart.current) molstart.current.mergestructureligandshoworhide(name_id, isshow);
	};

	// 删除组件
	const deletedStructure = (name_id: string) => {
		if (molstart && molstart.current) molstart.current.remove(name_id);
	};

	const hideoridata = (params: string) => {
		if (molstart && molstart.current) {
			// 隐藏原本数据
			const structCells = molstart.current.plugin.state.data.selectQ(q => q.ofType(PluginStateObject.Molecule.Structure));
			const stru = Array.from(structCells)
				.filter(cell => cell.cache && Object.keys(cell.cache).length > 0)
				.map(cell => {
					return { ref: cell.sourceRef };
				})
				.filter((value, index, self) => index === self.findIndex(t => t.ref === value.ref)) as { ref: string }[];
			const hierarchyManager = molstart.current.plugin.managers.structure.hierarchy;
			stru.forEach(struct => {
				// 查找当前 refs 中与 structures 的 ref 匹配的引用
				const ref = hierarchyManager.current.refs.get(struct.ref);
				if (ref && ref.cell.obj?.label !== "Merged Structure" && params === "hide")
					hierarchyManager.toggleVisibility([ref], "hide");
				else if (ref && ref.cell.obj?.label !== "Merged Structure" && params === "show")
					hierarchyManager.toggleVisibility([ref], "show");
			});
		}
	};

	// 加载合并模型
	const loadStructuresFromUrlsAndMerge = (params: SinglePolymerAndLigandShowOrHideType) => {
		if (molstart && molstart.current) {
			molstart.current.loadStructuresFromUrlsAndMerge().then(() => {
				setTimeout(() => {
					if (molstart && molstart.current) molstart.current.SinglePolymerAndLigandShowOrHide(params);
				}, 500);
			});
		}
	};

	// 导出所有models
	const exportmodels = () => {
		if (molstart && molstart.current) molstart.current.exportmodel();
	};

	// 根据传入的data来进行渲染数据
	const loadStructureFromData = async (loadFileData: LoadFileData, index: number) => {
		if (molstart && molstart.current) {
			const structureHierarchy = await molstart.current.loadStructureFromData(loadFileData);
			await handleFocusCenter(index);

			return structureHierarchy;
		}
		return null;
	};

	// 控制分子/蛋白质显隐
	const setStructureVisibility = async (index: number, visible: boolean) => {
		if (molstart && molstart.current) {
			const data = molstart.current?.plugin.state.data;
			const ref = molstart.current?.plugin.managers.structure.hierarchy.current.structures[Number(index)].cell.transform.ref;
			// 如果visible为true，则显示相互作用，否则隐藏
			if (visible) await handleFocusCenter(Number(index));

			molstart.current.setStructureVisibility(data, ref, !visible);
		}
	};
	// 清空画布
	const clear = () => {
		if (molstart && molstart.current) molstart.current.plugin.clear();
	};
	// 判断mol是否加载完成
	const isLoad = () => {
		return !!(molstart && molstart.current);
	};

	// 获取相互作用参数
	const interactionData = useMemo(() => {
		const interactionsObj: interactions = {
			"cation-pi": InteractionsEnum.off,
			"halogen-bonds": InteractionsEnum.off,
			"hydrogen-bonds": InteractionsEnum.off,
			hydrophobic: InteractionsEnum.off,
			ionic: InteractionsEnum.off,
			"metal-coordination": InteractionsEnum.off,
			"pi-stacking": InteractionsEnum.off,
			"weak-hydrogen-bonds": InteractionsEnum.off
		};
		if (molstart && molstart.current) {
			const interactionsOptions = molstart.current?.plugin.managers.structure.component.state.options.interactions.providers;

			if (interactionsOptions) {
				const keys = Object.keys(interactionsOptions);
				keys.forEach(key => {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					interactionsObj[key as interactionsKeys] = interactionsOptions[key].name as InteractionsEnum;
				});
			}
		}
		return interactionsObj;
	}, [isMolLoad, isRefresh]);

	const handleInteractionBoxClick = (key: interactionsKeys, value: InteractionsEnum) => {
		if (molstart && molstart.current) {
			const options = molstart.current?.plugin.managers.structure.component.state.options;
			const n_options = initOptions(options, key, value);
			molstart.current.plugin.managers.structure.component.setOptions(n_options);
			setTimeout(() => {
				molstart.current?.plugin.canvas3d?.update();
				setIsRefresh(!isRefresh);
			});
		}
	};

	useEffect(() => {
		handleInteractionBoxClick("cation-pi", InteractionsEnum.off);
	}, [isMolLoad]);

	// 相互作用设置
	const setInteraction = (ionic: boolean) => {
		if (molstart && molstart.current) {
			const options = molstart.current?.plugin.managers.structure.component.state.options;
			const n_options = { ...options };

			if (ionic) {
				n_options.interactions.providers.ionic = {
					name: "on",
					params: {
						distanceMax: 5
					}
				};
			} else {
				n_options.interactions.providers.ionic = {
					name: "off",
					params: {}
				};
			}
			molstart.current.plugin.managers.structure.component.setOptions(n_options);
			setTimeout(() => {
				molstart.current?.plugin.canvas3d?.update();
			});
		}
	};

	const test = () => {
		if (molstart && molstart.current) console.log(molstart.current);
	};

	useImperativeHandle(ref, () => {
		return {
			loadStructureFromUrl,
			loadStructuresFromUrlsAndMerge,
			loadStructureFromData,
			mergeShowHide,
			deletedStructure,
			updatebox,
			exportmodels,
			setStructureVisibility,
			getCenter,
			clear,
			isLoad,
			setInteraction,
			test,
			drawBox,
			focusClicked
		};
	}, []);
	return (
		<>
			<div style={{ width: "100%", height: "100%" }} id={id}></div>
			{/* 这里进行二次优化 现有的效果不满足*/}
			{/*{isInteraction && isMolLoad && <InteractionBox interactionsData={interactionData} onClick={handleInteractionBoxClick} />}*/}
		</>
	);
});
MolstarViewer.displayName = "MolstarComp";

export { MolstarViewer };
