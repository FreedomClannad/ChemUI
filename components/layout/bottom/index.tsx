import "./index.css";
import type { LayoutContainer } from "#/layout/types";
const BottomLayout = (props: LayoutContainer) => {
	const { mainContainer, minorContainer } = props;
	return (
		<div className="chem-ui-bottom-layout-container">
			<div className="cubl-top">{minorContainer}</div>
			<div className="cubl-bottom">{mainContainer}</div>
		</div>
	);
};
export { BottomLayout };
