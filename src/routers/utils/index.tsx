import { PageRouteObject } from "../types";

// 将对象的path拼接成完整内容
export const flattenRouter = (router: PageRouteObject[], parentPath: string = ""): PageRouteObject[] => {
    return router.reduce((pre, cur) => {
        const curPath = cur.path || "";
        const path = `${parentPath}/${curPath}`.replace(/\/+/g, "/"); // 处理多余的斜杠
        if (cur.children) {
            return [...pre, ...flattenRouter(cur.children, path)];
        }
        return [...pre, { ...cur, path: path }];
    }, [] as PageRouteObject[]);
};

/**
 * 从modules文件动态生成路由, 顺便进行排序
 */
export const getRouterFromModules = () => {
    const routerModules: PageRouteObject[] = [];
    const modules = import.meta.glob("../modules/**/*.tsx", { eager: true });
    Object.keys(modules).forEach(key => {
        const router = (modules as any)[key].default || {};
        const modList = Array.isArray(router) ? [...router] : [router];
        routerModules.push(...modList);
    });
    routerModules.sort((a, b) => (a.sort || 0) - (b.sort || 0));
    return routerModules;
};