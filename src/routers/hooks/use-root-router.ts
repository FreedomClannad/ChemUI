import { getRootRouter } from "@/routers/root-router";

export const useRootRouteHooks = () => {
    const rootRouter = getRootRouter();
    return { rootRouter };
};