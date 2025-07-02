import { RouterProvider, createBrowserRouter, type RouteObject } from "react-router-dom";

import { useRootRouteHooks } from "@/routers/hooks";

import { otherRouter } from "./outer-router";

import type { PageRouteObject } from "./types";

export default function Router() {
	const { rootRouter } = useRootRouteHooks();
	const routes: PageRouteObject[] = [...rootRouter, ...otherRouter];
	const router = createBrowserRouter(routes as unknown as RouteObject[]);
	return <RouterProvider router={router} />;
}
