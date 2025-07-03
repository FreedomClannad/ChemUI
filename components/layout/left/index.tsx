import "./index.css";
import type { LayoutContainer } from "#/layout/types";
const LeftLayout = (props: LayoutContainer) => {
	const { mainContainer, minorContainer } = props;
	return (
		<div className="chem-ui-left-layout-container">
			<div className="cull-left">{mainContainer}</div>
			<div className="cull-right">{minorContainer}</div>
		</div>
	);
};
export { LeftLayout };
