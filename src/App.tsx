import "./App.css";
import "@/utils";
import { Descriptions } from "@/descriptions";

function App() {
	return (
		<div className="h-8">
			<Descriptions title="Chem" description="内容介绍">
				<div>内容展示</div>
			</Descriptions>
		</div>
	);
}

export default App;
