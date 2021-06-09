import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: (() => {
    interface RouteItem {
      path: string;
      component: string;
      wrappers?: string[];
      exact?: boolean;
      routes?: Array<{ path: string; component: string }>;
    }

    const addBaseWrapper = (route: RouteItem): RouteItem => {
      let wrappers = ['@/wrappers/base'].concat(route.wrappers ?? []);
      return { ...route, wrappers };
    };
    const routes: RouteItem[] = [];

    return [
      { path: '/', redirect: '/mallManage' },
      ...routes.map(addBaseWrapper),
    ];
  })(),
  fastRefresh: {},
  qiankun: {
    slave: {},
  },
  theme: {
    '@primary-color': '#695ADF', // 全局主色
    '@border-radius-base': '8px', // 组件/浮层圆角
  },
});
