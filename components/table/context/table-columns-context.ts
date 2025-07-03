import { createContext } from "react";
import type { useTableColumnsStateType } from "#/table/hooks/use-table-columns-state.ts";

type ContextType = useTableColumnsStateType;
export const TableColumnsContext = createContext<ContextType>(undefined!);
