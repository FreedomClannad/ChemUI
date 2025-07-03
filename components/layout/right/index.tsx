import "./index.css";
import type { LayoutContainer } from "#/layout/types";
const RightLayout = (props: LayoutContainer) => {
	const { mainContainer, minorContainer } = props;
	return (
		<div className="chem-ui-right-layout-container">
			<div className="curl-left">{minorContainer}</div>
			<div className="curl-right">{mainContainer}</div>
		</div>
	);
};
export { RightLayout };
