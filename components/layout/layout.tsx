import type { ComponentType } from "react";
import { LeftLayout } from "#/layout/left";
import { RightLayout } from "#/layout/right";
import { TopLayout } from "#/layout/top";
import { BottomLayout } from "#/layout/bottom";
import { type LayoutContainer, LayoutDirectionEnum } from "#/layout/types";

export type ChemUiLayoutType = {
	direction?: LayoutDirectionEnum;
} & LayoutContainer;
type ChemUILayoutRenderType = {
	[LayoutDirectionEnum.LEFT]: ComponentType<LayoutContainer>;
	[LayoutDirectionEnum.RIGHT]: ComponentType<LayoutContainer>;
	[LayoutDirectionEnum.TOP]: ComponentType<LayoutContainer>;
	[LayoutDirectionEnum.BOTTOM]: ComponentType<LayoutContainer>;
};
const ChemUILayoutRenderMap: ChemUILayoutRenderType = {
	[LayoutDirectionEnum.LEFT]: LeftLayout,
	[LayoutDirectionEnum.RIGHT]: RightLayout,
	[LayoutDirectionEnum.TOP]: TopLayout,
	[LayoutDirectionEnum.BOTTOM]: BottomLayout
};
const Layout = (props: ChemUiLayoutType) => {
	const { direction = LayoutDirectionEnum.LEFT, mainContainer } = props;
	const Component = ChemUILayoutRenderMap[direction];
	if (Component) return <Component {...props} />;
	return <>{mainContainer}</>;
};

export { Layout };
