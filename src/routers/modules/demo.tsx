import { PageRouteObject } from "@/routers/types";
import LazyLoad from "@/routers/utils/lazy-load";
import { lazy } from "react";
const demo: PageRouteObject = {
	path: "/demo",
	label: "demo",
	element: LazyLoad(lazy(() => import("@/pages/demo")))
};

export default demo;
