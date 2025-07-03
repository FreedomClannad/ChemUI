import { createContext } from "react";
import type { useMolstarType } from "#/hooks";

const MolstarContext = createContext<useMolstarType>(undefined!);

export { MolstarContext };
