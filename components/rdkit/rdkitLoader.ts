// rdkitLoader.ts
import initRDKitModule, { type RDKitModule } from "@rdkit/rdkit";

let rdkitPromise: Promise<RDKitModule> | null = null;

export const loadRDKit = (options?: { locateFile?: (file: string) => string }) => {
	if (!rdkitPromise) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		rdkitPromise = (initRDKitModule as any).default ? (initRDKitModule as any).default(options) : initRDKitModule(options);
	}
	return rdkitPromise;
};
