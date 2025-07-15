import type { PageRouteObject } from "@/routers/types";
import LazyLoad from "@/routers/utils/lazy-load";
import { lazy } from "react";
const smiles: PageRouteObject = {
	path: "smiles",
	label: "smiles",
	element: LazyLoad(lazy(() => import("@/pages/smiles")))
};

export default smiles;
