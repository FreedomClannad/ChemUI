import { useEffect, useMemo, useState } from "react";
import { v4 as uuid4 } from "uuid";
import { cn, getShortId } from "#/utils";
import { RiAppleFill, RiAppleLine } from "@remixicon/react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { MolstarViewer } from "#/molstar";
import { type ChemUIListFileType, type ChemUIListItemType, ModeEnum } from "#/list/types";
import { MolstarContext } from "#/context";
import { type useMolstarType, useMolstar, useMolstarTools } from "#/hooks";
import { getMolstarFormat } from "#/molstar/utils.ts";
import { BaseSidebar, ImageSidebar, ToolsImageSidebar, ToolsSidebar } from "#/sidebar";
import type { ImageSidebarItemType, SidebarItemType } from "#/sidebar";
import "./molstar.css";
import { ImageCard } from "#/img";

type MolstarRenderProps = {
	molstarHooks: useMolstarType;
};

const MolstarRender = ({ molstarHooks }: MolstarRenderProps) => {
	const { MolstarRef, setIsMolstarMounted } = molstarHooks;
	return (
		<MolstarViewer
			ref={MolstarRef}
			isInteraction={false}
			options={{
				layoutShowControls: false,
				layoutShowSequence: false
			}}
			onLoad={() => {
				setIsMolstarMounted(true);
			}}
		/>
	);
};
const Molstar = (props: ChemUIListItemType) => {
	const { path, format, contentHeight } = props;
	const molstarHooks = useMolstar({ isMerge: false });
	const { loadStructureFromUrl } = molstarHooks;
	const { rootHeight } = useMolstarTools({ contentHeight });
	useEffect(() => {
		if (typeof path === "string" && path && format) {
			loadStructureFromUrl({
				id: uuid4(),
				loadFileURL: {
					url: path,
					format: getMolstarFormat(format)
				}
			});
		}
	}, [path, format]);
	return (
		<div className={cn("chem-ui-list-molstar-body")} style={{ height: rootHeight }}>
			<MolstarContext.Provider value={molstarHooks}>
				<MolstarRender molstarHooks={molstarHooks} />
			</MolstarContext.Provider>
		</div>
	);
};

const MolstarSeqRender = ({ molstarHooks }: MolstarRenderProps) => {
	const { MolstarRef, setIsMolstarMounted } = molstarHooks;
	return (
		<MolstarViewer
			ref={MolstarRef}
			isInteraction={false}
			onLoad={() => {
				setIsMolstarMounted(true);
			}}
		/>
	);
};

const MolstarSeq = (props: ChemUIListItemType) => {
	const { path, format, contentHeight } = props;
	const molstarHooks = useMolstar({ isMerge: false });
	const { loadStructureFromUrl } = molstarHooks;
	const { rootHeight } = useMolstarTools({ contentHeight });
	useEffect(() => {
		if (typeof path === "string" && path && format) {
			loadStructureFromUrl({
				id: uuid4(),
				loadFileURL: {
					url: path,
					format: getMolstarFormat(format)
				}
			});
		}
	}, [path, format]);
	return (
		<div className={cn("chem-ui-list-molstar-body")} style={{ height: rootHeight }}>
			<MolstarContext.Provider value={molstarHooks}>
				<MolstarSeqRender molstarHooks={molstarHooks} />
			</MolstarContext.Provider>
		</div>
	);
};

type MolstarFile = {
	format: string;
	visible: boolean;
};

type MolstarPanelFile = MolstarFile & ChemUIListFileType & SidebarItemType;

const MolstarPanelSingle = (props: ChemUIListItemType) => {
	const { path, format, contentHeight, name } = props;
	const [fileList, setFileList] = useState<MolstarPanelFile[]>([]);
	const [selectFileKey, setSelectFileKey] = useState<string>("");
	const { rootHeight } = useMolstarTools({ contentHeight });
	const molstarHooks = useMolstar({ isMerge: false });
	const { loadStructureFromUrl, setStructureVisibilityOneShow } = molstarHooks;

	useEffect(() => {
		if (typeof path === "string") {
			setFileList([
				{
					path,
					format: getMolstarFormat(format),
					name,
					visible: false,
					label: name,
					key: getShortId()
				}
			]);
		} else if (Array.isArray(path)) {
			const list = path.map(
				item =>
					({
						...item,
						format: getMolstarFormat(item.format),
						label: item.name,
						visible: false,
						key: getShortId()
					}) as MolstarPanelFile
			);
			setFileList(list);
		}
	}, [path, format]);
	const handleClick = (molstarFile: MolstarPanelFile) => {
		setSelectFileKey(molstarFile.key);
		setStructureVisibilityOneShow({
			molstar: {
				id: molstarFile.key,
				label: molstarFile.key,
				visible: true
			},
			addCallback: () => {
				loadStructureFromUrl({
					id: molstarFile.key,
					loadFileURL: {
						url: molstarFile.path,
						format: getMolstarFormat(molstarFile.format)
					}
				});
			}
		});

		const molstarFileList = fileList.map(item => {
			if (item.key === molstarFile.key) {
				return {
					...item,
					visible: true
				};
			}
			return { ...item, visible: false };
		});

		setFileList(molstarFileList);
	};
	return (
		<div className={cn("flex")} style={{ height: rootHeight }}>
			<div className="h-full min-w-[240px] flex-shrink-0">
				<BaseSidebar<MolstarPanelFile>
					items={fileList}
					label={item => {
						return (
							<div className="flex max-w-[240px] items-center">
								<div className="flex-shrink-0">
									{item.key === selectFileKey ? (
										<RiAppleFill className="h-[12px] w-[12px]" />
									) : (
										<RiAppleLine className="h-[12px] w-[12px]" />
									)}
								</div>
								<div className="ml-2 overflow-hidden text-ellipsis whitespace-nowrap">{item.label}</div>
							</div>
						);
					}}
					onClick={handleClick}
				/>
			</div>
			<div className="relative flex-1">
				<MolstarContext.Provider value={molstarHooks}>
					<MolstarRender molstarHooks={molstarHooks} />
				</MolstarContext.Provider>
			</div>
		</div>
	);
};

const MolstarPanelMulti = (props: ChemUIListItemType) => {
	const { path, format, contentHeight, name } = props;
	const [fileList, setFileList] = useState<MolstarPanelFile[]>([]);
	const { rootHeight } = useMolstarTools({ contentHeight });
	const molstarHooks = useMolstar({ isMerge: false });
	const { loadStructureFromUrl, setStructureVisibility } = molstarHooks;

	useEffect(() => {
		if (typeof path === "string") {
			setFileList([
				{
					path,
					format: getMolstarFormat(format),
					name,
					visible: false,
					label: name,
					key: getShortId()
				}
			]);
		} else if (Array.isArray(path)) {
			const list = path.map(
				item =>
					({
						...item,
						format: getMolstarFormat(item.format),
						label: item.name,
						visible: false,
						key: getShortId()
					}) as MolstarPanelFile
			);
			setFileList(list);
		}
	}, [path, format]);
	const handleClick = (molstarFile: MolstarPanelFile) => {
		setStructureVisibility({
			molstar: {
				id: molstarFile.key,
				label: molstarFile.key,
				visible: !molstarFile.visible
			},
			addCallback: () => {
				loadStructureFromUrl({
					id: molstarFile.key,
					loadFileURL: {
						url: molstarFile.path,
						format: getMolstarFormat(molstarFile.format)
					}
				});
			}
		});

		const molstarFileList = fileList.map(item => {
			if (item.key === molstarFile.key) {
				return {
					...item,
					visible: !molstarFile.visible
				};
			}
			return { ...item };
		});
		setFileList(molstarFileList);
	};
	return (
		<div className={cn("flex")} style={{ height: rootHeight }}>
			<div className="h-full min-w-[240px] flex-shrink-0">
				<BaseSidebar<MolstarPanelFile>
					items={fileList}
					label={item => {
						return (
							<div className="flex max-w-[240px] items-center">
								<div className="flex-shrink-0">
									{item.visible ? <RiAppleFill className="h-[12px] w-[12px]" /> : <RiAppleLine className="h-[12px] w-[12px]" />}
								</div>
								<div className="ml-2 overflow-hidden text-ellipsis whitespace-nowrap">{item.label}</div>
							</div>
						);
					}}
					onClick={handleClick}
				/>
			</div>
			<div className="relative flex-1">
				<MolstarContext.Provider value={molstarHooks}>
					<MolstarRender molstarHooks={molstarHooks} />
				</MolstarContext.Provider>
			</div>
		</div>
	);
};

const MolstarPanelPicker = (props: ChemUIListItemType) => {
	const { path, format, contentHeight, name } = props;
	const [fileList, setFileList] = useState<MolstarPanelFile[]>([]);
	const [mode, setMode] = useState<ModeEnum>(ModeEnum.SINGLE);
	const { rootHeight } = useMolstarTools({ contentHeight });
	const molstarHooks = useMolstar({ isMerge: false });
	const { loadStructureFromUrl, setStructureVisibility, setStructureVisibilityOneShow } = molstarHooks;
	useEffect(() => {
		if (typeof path === "string") {
			setFileList([
				{
					path,
					format: getMolstarFormat(format),
					name,
					visible: false,
					label: name,
					key: getShortId()
				}
			]);
		} else if (Array.isArray(path)) {
			const list = path.map(
				item =>
					({
						...item,
						format: getMolstarFormat(item.format),
						label: item.name,
						visible: false,
						key: getShortId()
					}) as MolstarPanelFile
			);
			setFileList(list);
		}
	}, [path, format]);

	useEffect(() => {
		if (mode === ModeEnum.SINGLE) {
			const firstFile = fileList.find(item => item.visible);
			if (firstFile) {
				setStructureVisibilityOneShow({
					molstar: {
						id: firstFile.key,
						label: firstFile.key,
						visible: true
					},
					addCallback: () => {
						loadStructureFromUrl({
							id: firstFile.key,
							loadFileURL: {
								url: firstFile.path,
								format: getMolstarFormat(firstFile.format)
							}
						});
					}
				});
				const molstarFileList = fileList.map(item => {
					if (item.key === firstFile.key) {
						return {
							...item,
							visible: true
						};
					}
					return { ...item, visible: false };
				});
				setFileList(molstarFileList);
			}
		}
	}, [mode]);

	const handleClick = (molstarFile: MolstarPanelFile) => {
		if (mode === ModeEnum.SINGLE) {
			setStructureVisibilityOneShow({
				molstar: {
					id: molstarFile.key,
					label: molstarFile.key,
					visible: !molstarFile.visible
				},
				addCallback: () => {
					loadStructureFromUrl({
						id: molstarFile.key,
						loadFileURL: {
							url: molstarFile.path,
							format: getMolstarFormat(molstarFile.format)
						}
					});
				}
			});
			const molstarFileList = fileList.map(item => {
				if (item.key === molstarFile.key) {
					return {
						...item,
						visible: !molstarFile.visible
					};
				}
				return { ...item, visible: false };
			});
			setFileList(molstarFileList);
		} else if (mode === ModeEnum.MULTI) {
			setStructureVisibility({
				molstar: {
					id: molstarFile.key,
					label: molstarFile.key,
					visible: !molstarFile.visible
				},
				addCallback: () => {
					loadStructureFromUrl({
						id: molstarFile.key,
						loadFileURL: {
							url: molstarFile.path,
							format: getMolstarFormat(molstarFile.format)
						}
					});
				}
			});
			const molstarFileList = fileList.map(item => {
				if (item.key === molstarFile.key) {
					return {
						...item,
						visible: !molstarFile.visible
					};
				}
				return { ...item };
			});
			setFileList(molstarFileList);
		}
	};

	const menuItem = [
		{
			key: ModeEnum.SINGLE,
			label: "Single"
		},
		{
			key: ModeEnum.MULTI,
			label: "Multi"
		}
	];

	const modeText = useMemo(() => {
		const text = menuItem.find(item => item.key === mode)?.label;
		return text || "";
	}, [mode]);

	const tools = (
		<div className="mr-2">
			<Dropdown
				trigger={["click"]}
				menu={{
					items: menuItem,
					onClick: ({ key }) => {
						setMode(key as ModeEnum);
					}
				}}
			>
				<Space className="cursor-pointer text-sm text-gray-800">
					{modeText}
					<DownOutlined />
				</Space>
			</Dropdown>
		</div>
	);

	return (
		<div className={cn("flex")} style={{ height: rootHeight }}>
			<div className="h-full min-w-[240px] flex-shrink-0">
				<ToolsSidebar<MolstarPanelFile>
					title={"Mode"}
					tools={tools}
					items={fileList}
					label={item => {
						return (
							<div className="flex max-w-[240px] items-center">
								<div className="flex-shrink-0">
									{item.visible ? <RiAppleFill className="h-[12px] w-[12px]" /> : <RiAppleLine className="h-[12px] w-[12px]" />}
								</div>

								<div className="ml-2 overflow-hidden text-ellipsis whitespace-nowrap">{item.label}</div>
							</div>
						);
					}}
					onClick={handleClick}
				/>
			</div>
			<div className="relative flex-1">
				<MolstarContext.Provider value={molstarHooks}>
					<MolstarRender molstarHooks={molstarHooks} />
				</MolstarContext.Provider>
			</div>
		</div>
	);
};

type MolstarImageFile = MolstarFile &
	ChemUIListFileType &
	ImageSidebarItemType & {
		smiles: string;
	};

const MolstarImageSingle = (props: ChemUIListItemType) => {
	const { path, format, contentHeight, name, smiles } = props;
	const [fileList, setFileList] = useState<MolstarImageFile[]>([]);
	const [selectFileKey, setSelectFileKey] = useState<string>("");
	const { rootHeight } = useMolstarTools({ contentHeight });
	const molstarHooks = useMolstar({ isMerge: false });
	const { loadStructureFromUrl, setStructureVisibilityOneShow } = molstarHooks;

	useEffect(() => {
		if (typeof path === "string") {
			setFileList([
				{
					path,
					format: getMolstarFormat(format),
					name,
					visible: false,
					key: getShortId(),
					smiles: smiles || ""
				}
			]);
		} else if (Array.isArray(path)) {
			const list = path.map(
				item =>
					({
						...item,
						format: getMolstarFormat(item.format),
						name: item.name,
						visible: false,
						key: getShortId(),
						smiles: item.smiles || ""
					}) as MolstarImageFile
			);
			setFileList(list);
		}
	}, [path, format]);
	const handleClick = (molstarFile: MolstarImageFile) => {
		setSelectFileKey(molstarFile.key);
		setStructureVisibilityOneShow({
			molstar: {
				id: molstarFile.key,
				label: molstarFile.key,
				visible: true
			},
			addCallback: () => {
				loadStructureFromUrl({
					id: molstarFile.key,
					loadFileURL: {
						url: molstarFile.path,
						format: getMolstarFormat(molstarFile.format)
					}
				});
			}
		});

		const molstarFileList = fileList.map(item => {
			if (item.key === molstarFile.key) {
				return {
					...item,
					visible: true
				};
			}
			return { ...item, visible: false };
		});

		setFileList(molstarFileList);
	};
	return (
		<div className={cn("flex")} style={{ height: rootHeight }}>
			<div className="h-full min-w-[200px] flex-shrink-0 bg-[#F7F8FA]">
				<ImageSidebar<MolstarImageFile>
					items={fileList}
					render={item => {
						return (
							<div className={cn("h-full w-full rounded-[4px] border bg-white", item.key === selectFileKey && "border-blue-500")}>
								<div className="flex w-[200px] items-center p-[10px]">
									<ImageCard name={item.name} src={item.smiles} />
								</div>
							</div>
						);
					}}
					onClick={handleClick}
				/>
			</div>
			<div className="relative flex-1">
				<MolstarContext.Provider value={molstarHooks}>
					<MolstarRender molstarHooks={molstarHooks} />
				</MolstarContext.Provider>
			</div>
		</div>
	);
};

const MolstarImageMulti = (props: ChemUIListItemType) => {
	const { path, format, contentHeight, name, smiles } = props;
	const [fileList, setFileList] = useState<MolstarImageFile[]>([]);
	const { rootHeight } = useMolstarTools({ contentHeight });
	const molstarHooks = useMolstar({ isMerge: false });
	const { loadStructureFromUrl, setStructureVisibility } = molstarHooks;

	useEffect(() => {
		if (typeof path === "string") {
			setFileList([
				{
					path,
					format: getMolstarFormat(format),
					name,
					visible: false,
					key: getShortId(),
					smiles: smiles || ""
				}
			]);
		} else if (Array.isArray(path)) {
			const list = path.map(
				item =>
					({
						...item,
						format: getMolstarFormat(item.format),
						name: item.name,
						visible: false,
						key: getShortId(),
						smiles: item.smiles || ""
					}) as MolstarImageFile
			);
			setFileList(list);
		}
	}, [path, format]);
	const handleClick = (molstarFile: MolstarImageFile) => {
		setStructureVisibility({
			molstar: {
				id: molstarFile.key,
				label: molstarFile.key,
				visible: !molstarFile.visible
			},
			addCallback: () => {
				loadStructureFromUrl({
					id: molstarFile.key,
					loadFileURL: {
						url: molstarFile.path,
						format: getMolstarFormat(molstarFile.format)
					}
				});
			}
		});

		const molstarFileList = fileList.map(item => {
			if (item.key === molstarFile.key) {
				return {
					...item,
					visible: !molstarFile.visible
				};
			}
			return { ...item };
		});
		setFileList(molstarFileList);
	};
	return (
		<div className={cn("flex")} style={{ height: rootHeight }}>
			<div className="h-full min-w-[200px] flex-shrink-0 bg-[#F7F8FA]">
				<ImageSidebar<MolstarImageFile>
					items={fileList}
					render={item => {
						return (
							<div className={cn("h-full w-full rounded-[4px] border bg-white", item.visible && "border-blue-500")}>
								<div className="flex w-[200px] items-center p-[10px]">
									<ImageCard name={item.name} src={item.smiles} />
								</div>
							</div>
						);
					}}
					onClick={handleClick}
				/>
			</div>
			<div className="relative flex-1">
				<MolstarContext.Provider value={molstarHooks}>
					<MolstarRender molstarHooks={molstarHooks} />
				</MolstarContext.Provider>
			</div>
		</div>
	);
};

const MolstarImagePicker = (props: ChemUIListItemType) => {
	const { path, format, contentHeight, name, smiles } = props;
	const [fileList, setFileList] = useState<MolstarImageFile[]>([]);
	const [mode, setMode] = useState<ModeEnum>(ModeEnum.SINGLE);
	const { rootHeight } = useMolstarTools({ contentHeight });
	const molstarHooks = useMolstar({ isMerge: false });
	const { loadStructureFromUrl, setStructureVisibility, setStructureVisibilityOneShow } = molstarHooks;
	useEffect(() => {
		if (typeof path === "string") {
			setFileList([
				{
					path,
					format: getMolstarFormat(format),
					name,
					visible: false,
					key: getShortId(),
					smiles: smiles || ""
				}
			]);
		} else if (Array.isArray(path)) {
			const list = path.map(
				item =>
					({
						...item,
						format: getMolstarFormat(item.format),
						name: item.name,
						visible: false,
						key: getShortId(),
						smiles: item.smiles || ""
					}) as MolstarImageFile
			);
			setFileList(list);
		}
	}, [path, format]);

	useEffect(() => {
		if (mode === ModeEnum.SINGLE) {
			const firstFile = fileList.find(item => item.visible);
			if (firstFile) {
				setStructureVisibilityOneShow({
					molstar: {
						id: firstFile.key,
						label: firstFile.key,
						visible: true
					},
					addCallback: () => {
						loadStructureFromUrl({
							id: firstFile.key,
							loadFileURL: {
								url: firstFile.path,
								format: getMolstarFormat(firstFile.format)
							}
						});
					}
				});
				const molstarFileList = fileList.map(item => {
					if (item.key === firstFile.key) {
						return {
							...item,
							visible: true
						};
					}
					return { ...item, visible: false };
				});
				setFileList(molstarFileList);
			}
		}
	}, [mode]);

	const handleClick = (molstarFile: MolstarImageFile) => {
		if (mode === ModeEnum.SINGLE) {
			setStructureVisibilityOneShow({
				molstar: {
					id: molstarFile.key,
					label: molstarFile.key,
					visible: !molstarFile.visible
				},
				addCallback: () => {
					loadStructureFromUrl({
						id: molstarFile.key,
						loadFileURL: {
							url: molstarFile.path,
							format: getMolstarFormat(molstarFile.format)
						}
					});
				}
			});
			const molstarFileList = fileList.map(item => {
				if (item.key === molstarFile.key) {
					return {
						...item,
						visible: !molstarFile.visible
					};
				}
				return { ...item, visible: false };
			});
			setFileList(molstarFileList);
		} else if (mode === ModeEnum.MULTI) {
			setStructureVisibility({
				molstar: {
					id: molstarFile.key,
					label: molstarFile.key,
					visible: !molstarFile.visible
				},
				addCallback: () => {
					loadStructureFromUrl({
						id: molstarFile.key,
						loadFileURL: {
							url: molstarFile.path,
							format: getMolstarFormat(molstarFile.format)
						}
					});
				}
			});
			const molstarFileList = fileList.map(item => {
				if (item.key === molstarFile.key) {
					return {
						...item,
						visible: !molstarFile.visible
					};
				}
				return { ...item };
			});
			setFileList(molstarFileList);
		}
	};

	const menuItem = [
		{
			key: ModeEnum.SINGLE,
			label: "Single"
		},
		{
			key: ModeEnum.MULTI,
			label: "Multi"
		}
	];

	const modeText = useMemo(() => {
		const text = menuItem.find(item => item.key === mode)?.label;
		return text || "";
	}, [mode]);

	const tools = (
		<div className="mr-2">
			<Dropdown
				trigger={["click"]}
				menu={{
					items: menuItem,
					onClick: ({ key }) => {
						setMode(key as ModeEnum);
					}
				}}
			>
				<Space className="cursor-pointer text-sm text-gray-800">
					{modeText}
					<DownOutlined />
				</Space>
			</Dropdown>
		</div>
	);

	return (
		<div className={cn("flex")} style={{ height: rootHeight }}>
			<div className="h-full min-w-[200px] flex-shrink-0 bg-[#F7F8FA]">
				<ToolsImageSidebar<MolstarImageFile>
					title={"Mode"}
					tools={tools}
					items={fileList}
					render={item => {
						return (
							<div className={cn("h-full w-full rounded-[4px] border bg-white", item.visible && "border-blue-500")}>
								<div className="flex w-[200px] items-center p-[10px]">
									<ImageCard name={item.name} src={item.smiles} />
								</div>
							</div>
						);
					}}
					onClick={handleClick}
				/>
			</div>
			<div className="relative flex-1">
				<MolstarContext.Provider value={molstarHooks}>
					<MolstarRender molstarHooks={molstarHooks} />
				</MolstarContext.Provider>
			</div>
		</div>
	);
};

export {
	Molstar,
	MolstarSeq,
	MolstarPanelSingle,
	MolstarPanelMulti,
	MolstarPanelPicker,
	MolstarImageSingle,
	MolstarImageMulti,
	MolstarImagePicker
};
