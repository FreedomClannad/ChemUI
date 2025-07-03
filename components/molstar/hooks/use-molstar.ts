import { useEffect, useRef, useState } from "react";
import type { MolstarHandle } from "#/molstar";
import {
	type MolstarBoxAttribute,
	type MolstarCenterPosition,
	MolstarLoadEnum,
	type MolstarLoadFileData,
	type MolstarLoadFileURL,
	type MolstarLoadManager,
	type MolstarVisibleManager
} from "#/molstar/types";
import type { SinglePolymerAndLigandType } from "#/molstar/viewer.ts";

enum RenderType {
	"URL" = "URL",
	"DATA" = "DATA"
}

type RenderBuffer = {
	type: RenderType;
	molstarLoadFileURL?: MolstarLoadFileURL;
	molstarLoadFileData?: MolstarLoadFileData;
};

const MolstarVisibleManagerListConversionSinglePolymerAndLigandList = (mvmList: MolstarVisibleManager[]) => {
	const SinglePolymerAndLigandsList: SinglePolymerAndLigandType[] = [];
	mvmList.forEach(item => {
		SinglePolymerAndLigandsList.push({
			name_id: item.label,
			is_show: item.visible
		});
	});
	return SinglePolymerAndLigandsList;
};

export type useMolstarType = ReturnType<typeof useMolstar>;
type useMolstarProps = {
	isMerge?: boolean;
};
const useMolstar = (props: useMolstarProps = { isMerge: false }) => {
	const { isMerge = false } = props;
	const MolstarRef = useRef<MolstarHandle>(null);
	const [molstarList, setMolstarList] = useState<MolstarVisibleManager[]>([]);
	const molstarListRef = useRef(molstarList);
	const [molstarLoadList, setMolstarLoadList] = useState<MolstarLoadManager[]>([]);
	const molstarLoadListRef = useRef(molstarLoadList);
	const [renderBufferData, setRenderBufferData] = useState<RenderBuffer[]>([]);
	const [isMolstarMounted, setIsMolstarMounted] = useState(false);
	const [molstarCenterPosition, setMolstarCenterPosition] = useState<MolstarCenterPosition>({});

	const [boxAttribute, setBoxAttribute] = useState<MolstarBoxAttribute>({ x: 20, y: 20, z: 20 });

	// 添加渲染缓存数据
	const addRenderBufferData = (buffer: RenderBuffer) => {
		setRenderBufferData(renderBuffer => {
			return [...renderBuffer, buffer];
		});
	};

	// 清空缓存数据
	const clearRenderBufferData = () => {
		setRenderBufferData([]);
	};

	const molstarLoadSuccess = (id: string) => {
		if (molstarListRef.current) {
			const molstarLoadList = molstarLoadListRef.current;
			const index = molstarLoadList.findIndex(item => item.id === id);
			if (index !== -1) {
				molstarLoadList[index].loadStatus = MolstarLoadEnum.success;
				setMolstarLoadList([...molstarLoadList]);
			}
		}
	};

	const molstarLoadError = (id: string) => {
		if (molstarListRef.current) {
			const molstarLoadList = molstarLoadListRef.current;
			const index = molstarLoadList.findIndex(item => item.id === id);
			if (index !== -1) {
				molstarLoadList[index].loadStatus = MolstarLoadEnum.error;
				setMolstarLoadList([...molstarLoadList]);
			}
		}
	};

	const addMolstarLoad = (id: string) => {
		setMolstarLoadList([...molstarLoadListRef.current, { id, loadStatus: MolstarLoadEnum.loading }]);
	};

	// 添加分子/蛋白质
	const addStructure = (molstar: MolstarVisibleManager) => {
		const { id } = molstar;
		addMolstarLoad(id);
		setMolstarList([...molstarListRef.current, molstar]);
	};

	const drawBox2pos = (center: MolstarCenterPosition) => {
		if (MolstarRef.current) {
			console.log("画框");
			const drawbox = MolstarRef.current?.drawBox(center);
			return drawbox;
		}
		return null;
	};

	// 根据id获取数据
	const getStructure = (id: string) => {
		// return dockingMolstarList.find(item => item.id === id)
		return molstarListRef.current.find(item => item.id === id);
	};

	// 根据id删除数据
	const deleteStructure = (id: string) => {
		const molstarVisibleManager = molstarListRef.current.find(item => item.id === id);
		if (molstarVisibleManager && molstarVisibleManager.label) {
			const new_molstarList = molstarListRef.current.filter(item => item.id !== id);
			setMolstarList(new_molstarList);
			const { label } = molstarVisibleManager;
			MolstarRef.current?.deletedStructure(label);
		}
	};
	// 根据URL进行下载并渲染
	const loadStructureFromUrl = (molstarLoadFileURL: MolstarLoadFileURL) => {
		if (MolstarRef.current && MolstarRef.current.isLoad()) {
			console.log("直接渲染");
			const { id, loadFileURL } = molstarLoadFileURL;
			setTimeout(() => {
				const index = molstarListRef.current.findIndex(item => item.id === id);
				MolstarRef.current
					?.loadStructureFromUrl(loadFileURL, index)
					?.then(() => {
						molstarLoadSuccess(id);
					})
					.catch(() => {
						molstarLoadError(id);
					});
			}, 500);
		} else {
			console.log("缓存渲染");
			addRenderBufferData({ type: RenderType.URL, molstarLoadFileURL });
		}
	};
	// 根据数据直接渲染
	const loadStructureFromData = (molstarLoadFileData: MolstarLoadFileData) => {
		if (MolstarRef.current && MolstarRef.current.isLoad()) {
			const { id, loadFileData } = molstarLoadFileData;

			// console.log(molstarListRef)
			setTimeout(() => {
				const index = molstarListRef.current.findIndex(item => item.id === id);
				MolstarRef.current
					?.loadStructureFromData(loadFileData, index)
					?.then(() => {
						molstarLoadSuccess(id);
					})
					.catch(() => {
						molstarLoadError(id);
					});
			}, 500);

			// console.log(index)
		} else {
			addRenderBufferData({ type: RenderType.DATA, molstarLoadFileData });
		}
	};
	// 设置分子/蛋白质显隐
	const setStructureVisibility = ({ molstar, addCallback }: { molstar: MolstarVisibleManager; addCallback?: () => void }) => {
		if (MolstarRef.current) {
			const index = molstarListRef.current.findIndex(item => item.id === molstar.id);
			if (index === -1) {
				addStructure(molstar);
				addCallback?.();
			} else if (index >= 0) {
				const visible = molstar.visible;
				MolstarRef.current.setStructureVisibility(index, visible);
				const item = molstarListRef.current.map(item => {
					if (item.id === molstar.id) {
						return {
							...item,
							visible
						};
					}
					return item;
				});
				setMolstarList(item);
			} else {
				console.error(`未找到id为${molstar.id}的分子/蛋白质: index`);
			}
		}
	};

	// 设置分子/蛋白质显隐(1个显示，剩余隐藏)
	const setStructureVisibilityOneShow = ({
		molstar,
		addCallback
	}: {
		molstar: MolstarVisibleManager;
		addCallback?: () => void;
	}) => {
		if (MolstarRef.current) {
			const index = molstarListRef.current.findIndex(item => item.id === molstar.id);
			if (index === -1) {
				addStructure(molstar);
				addCallback?.();
			}
			setTimeout(() => {
				const molstarVisibleManager = molstarListRef.current.map(item => {
					if (item.id === molstar.id) {
						return {
							...item,
							...molstar
						};
					}
					return {
						...item,
						visible: false
					};
				});
				molstarVisibleManager.forEach((item, index) => {
					MolstarRef?.current?.setStructureVisibility(index, item.visible);
				});
				setMolstarList(molstarVisibleManager);
			});
		}
	};

	// 设置分子/蛋白质显隐
	const setStructureMergeShowHide = ({ molstar, addCallback }: { molstar: MolstarVisibleManager; addCallback?: () => void }) => {
		if (MolstarRef.current) {
			const molstarVisibleManager = molstarListRef.current.find(item => item.id === molstar.id);
			if (!molstarVisibleManager) {
				addStructure(molstar);
				addCallback?.();
			} else {
				const { label, visible } = molstar;
				MolstarRef.current.mergeShowHide(label, visible);
				const item = molstarListRef.current.map(item => {
					if (item.id === molstar.id) {
						return {
							...item,
							visible
						};
					}
					return item;
				});
				setMolstarList(item);
			}
		}
	};
	// 清除画布
	const clear = () => {
		if (MolstarRef.current) {
			MolstarRef.current.clear();
			molstarListRef.current = [];
			setMolstarList([]);
		}
	};

	const RenderBuffer = () => {
		console.log("molstarListRef.current", molstarListRef.current);
		if (renderBufferData.length > 0) {
			renderBufferData.forEach(buffer => {
				if (buffer.type === RenderType.URL) {
					const molstarLoadFileURL = buffer.molstarLoadFileURL;
					if (molstarLoadFileURL) {
						loadStructureFromUrl(molstarLoadFileURL);
					}
				} else if (buffer.type === RenderType.DATA) {
					const molstarLoadFileData = buffer.molstarLoadFileData;
					if (molstarLoadFileData) {
						loadStructureFromData(molstarLoadFileData);
					}
				}
			});
			clearRenderBufferData();
		}
	};

	const loadStructuresFromUrlsAndMerge = () => {
		if (MolstarRef.current) {
			const SinglePolymerAndLigandsList = MolstarVisibleManagerListConversionSinglePolymerAndLigandList(molstarListRef.current);
			console.log(SinglePolymerAndLigandsList);
			MolstarRef.current.loadStructuresFromUrlsAndMerge({ SinglePolymerAndLigandsList });
		}
	};

	// const getCenter = () => {
	// 	if (MolstarRef.current) {
	// 		const center = MolstarRef.current.getCenter();
	// 		console.log(`获取中心点坐标:${center}`);
	// 	}
	//
	// };
	const updateBoxAttribute = (boxAttribute: MolstarBoxAttribute) => {
		setBoxAttribute(boxAttribute);
	};

	useEffect(() => {
		if (MolstarRef.current && isMolstarMounted) {
			console.log("渲染使用缓存");
			RenderBuffer();
		}
	}, [isMolstarMounted]);

	useEffect(() => {
		molstarListRef.current = molstarList;
		console.log(molstarList);
	}, [molstarList]);

	// 合并功能
	useEffect(() => {
		molstarLoadListRef.current = molstarLoadList;
		console.log(isMerge);
		if (isMerge) {
			let isMergeState = true;
			molstarLoadList.forEach(item => {
				if (item.loadStatus === MolstarLoadEnum.loading) isMergeState = false;
			});
			if (isMergeState) {
				loadStructuresFromUrlsAndMerge();
			}
		}
	}, [molstarLoadList]);

	return {
		MolstarRef,
		molstarList,
		addStructure,
		getStructure,
		loadStructureFromUrl,
		loadStructureFromData,
		setStructureVisibility,
		setStructureMergeShowHide,
		clear,
		setIsMolstarMounted,
		molstarCenterPosition,
		setMolstarCenterPosition,
		deleteStructure,
		setStructureVisibilityOneShow,
		// 画框属性
		boxAttribute,
		updateBoxAttribute,
		drawBox2pos
	};
};

export { useMolstar };
