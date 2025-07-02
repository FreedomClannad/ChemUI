import { type LazyExoticComponent, Suspense } from "react";

const LazyLoad = (Comp: LazyExoticComponent<any>) => {
	return (
		<Suspense fallback={<div className="flex min-h-screen w-full items-center justify-center">加载</div>}>
			<Comp />
			{/*<ForeverLoadingComponent />*/}
		</Suspense>
	);
};

export default LazyLoad;
