import "./index.css";
import type { LayoutContainer } from "#/layout/types";
const TopLayout = (props: LayoutContainer) => {
	const { mainContainer, minorContainer } = props;
	return (
		<div className="chem-ui-top-layout-container">
			<div className="cutl-top">{mainContainer}</div>
			<div className="cutl-bottom">{minorContainer}</div>
		</div>
	);
};
export { TopLayout };
