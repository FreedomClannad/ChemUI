import type { ReactNode } from "react";

export enum LayoutDirectionEnum {
	LEFT = "left",
	RIGHT = "right",
	TOP = "top",
	BOTTOM = "bottom"
}

export type LayoutContainer = {
	mainContainer: ReactNode;
	minorContainer: ReactNode;
};
