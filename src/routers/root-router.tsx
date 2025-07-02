import { getRouterFromModules } from "./utils/index";

import type { PageRouteObject } from "./types";
import LazyLoad from "./utils/lazy-load";
import { lazy } from "react";

const routerModules = getRouterFromModules();
const { VITE_HOME: HOMEPAGE } = import.meta.env;
console.log(HOMEPAGE);
export const getRootRouter = (): PageRouteObject[] => {
	return [
		{
			path: "/",
			children: [{ index: true, element: LazyLoad(lazy(() => import("@/pages/list"))) }, ...routerModules]
		}
	];
};
