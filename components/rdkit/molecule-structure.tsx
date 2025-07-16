import React, { useEffect, useState } from "react";
import type { RDKitModule } from "@rdkit/rdkit";
import initRDKitModule from "@rdkit/rdkit";
import isEmpty from "lodash-es/isEmpty";
import { Skeleton } from "antd";
import { cn } from "#/utils";
import { errorBase64 } from "#/img";
import { loadRDKit } from "#/rdkit/rdkitLoader.ts";

export type RDKitLoaderOptions = {
	/**
	 * Optional path to the RDKit module .wasm file on your server.
	 */
	locateFile?: (file: string) => string;
};

type MoleculeStructureProps = {
	id: string;
	className?: string;
	width?: number;
	height?: number;
	structure: string;
	subStructure?: string;
	extraDetails?: Record<string, any>;
	drawingDelay?: number;
	onError?: (error: Error) => void;
	options?: RDKitLoaderOptions;
};

const MoleculeStructure: React.FC<MoleculeStructureProps> = ({
	id,
	className = "",
	width = 180,
	height = 180,
	structure,
	subStructure = "",
	extraDetails = {},
	drawingDelay,
	onError,
	options
}) => {
	const [svg, setSvg] = useState<string>();
	const [rdKitLoaded, setRdKitLoaded] = useState(false);
	const [rdKitError, setRdKitError] = useState(false);
	const [RDKit, setRDKit] = useState<RDKitModule | null>(null);

	const MOL_DETAILS = {
		width,
		height,
		bondLineWidth: 1,
		addStereoAnnotation: true,
		...extraDetails
	};

	const getMolDetails = (mol: any, qmol: any) => {
		if (mol && qmol) {
			const matches = JSON.parse(mol.get_substruct_matches(qmol));
			const merged = !isEmpty(matches)
				? matches.reduce(
						(acc: any, { atoms, bonds }: any) => ({
							atoms: [...acc.atoms, ...atoms],
							bonds: [...acc.bonds, ...bonds]
						}),
						{ atoms: [], bonds: [] }
					)
				: matches;
			return JSON.stringify({
				...MOL_DETAILS,
				...merged
			});
		} else {
			return JSON.stringify(MOL_DETAILS);
		}
	};

	const drawSVG = () => {
		if (!RDKit) return;
		try {
			const mol = RDKit.get_mol(structure || "invalid");
			const qmol = subStructure ? RDKit.get_qmol(subStructure) : null;

			if (!mol) throw new Error("Invalid molecule");

			const svgResult = mol.get_svg_with_highlights(getMolDetails(mol, qmol));
			setSvg(svgResult);

			mol.delete();
			qmol?.delete();
		} catch (error) {
			console.error("RDKit 渲染失败", error);
			onError?.(error as Error);
			setRdKitError(true);
		}
	};

	useEffect(() => {
		loadRDKit(options)
			?.then((mod: RDKitModule) => {
				setRDKit(mod);
				setRdKitLoaded(true);
			})
			.catch((err: any) => {
				console.error("RDKit 加载失败", err);
				setRdKitError(true);
				onError?.(new Error("RDKit 加载失败"));
			});
	}, []);

	useEffect(() => {
		if (!rdKitLoaded || rdKitError) return;
		if (drawingDelay) {
			const timer = setTimeout(drawSVG, drawingDelay);
			return () => clearTimeout(timer);
		}
		drawSVG();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [structure, subStructure, width, height, extraDetails, drawingDelay, rdKitLoaded]);

	if (rdKitError) {
		return (
			<div style={{ width, height }} className={cn("flex items-center justify-center", className)}>
				<img className="h-full w-full" src={errorBase64} alt="error" />
			</div>
		);
	}

	if (!rdKitLoaded || !svg) {
		return (
			<div style={{ width, height }} className={cn("flex items-center justify-center", className)}>
				<Skeleton.Image className="!h-full !w-full" />
			</div>
		);
	}

	return (
		<div
			id={id}
			title={structure}
			className={`molecule-structure-svg ${className}`}
			style={{ width, height }}
			dangerouslySetInnerHTML={{ __html: svg }}
		></div>
	);
};

export { MoleculeStructure };
