import type { ReactNode } from "react";
import type { RouteObject } from "react-router-dom";

export type PageRouteObject = Omit<RouteObject, "children"> & {
	sort?: number;
	children?: PageRouteObject[];
	label?: ReactNode;
	icon?: ReactNode;
};
