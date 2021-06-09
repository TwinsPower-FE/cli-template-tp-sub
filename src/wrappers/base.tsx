import React, { useState, useEffect, useContext } from 'react';
import { ConfigProvider, Breadcrumb } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'reset-css';
import styles from '@/styles/base.less';
import classNames from 'classnames';
import { history, Link } from 'umi';

enum MenuType {
  '分类导航',
  '菜单页面',
}

interface MenuItem {
  id: string;
  parentId?: string;
  name: string;
  path: string;
  type?: MenuType;
  sortIndex?: number;
}

interface Route {
  path: string;
  breadcrumbName: string;
  children?: Array<{
    path: string;
    breadcrumbName: string;
  }>;
}

export const BaseContext = React.createContext<{
  setBreadList: Function;
  breadList: Route[];
}>({
  setBreadList: () => {},
  breadList: [],
});

const Menus = () => {
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  useEffect(() => {
    setMenuList([
      { id: '1', name: '商场/门店管理', path: '/mallManage' },
      { id: '2', name: '门店列表', path: '/storeList' },
      { id: '3', name: '应用绑定', path: '/appManage' },
      { id: '4', name: '成员管理', path: '/memberManage' },
    ]);
    console.log('set menu data');
  }, []);
  const [curPath, setCurPath] = useState(history.location.pathname);
  const linkTo = (path) => {
    setCurPath(path);
    history.push(path);
  };
  return (
    <div className={styles.Menus}>
      <div className={styles.MenusTitle}>企业管理</div>
      <ul>
        {menuList.map((menu) => (
          <li
            className={classNames([
              styles.MenusItem,
              curPath.includes(menu.path) ? styles.Actived : '',
            ])}
            onClick={() => linkTo(menu.path)}
            key={menu.id}
          >
            {menu.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Breads = () => {
  const baseContext = useContext(BaseContext);
  function itemRender(route, params, routes, paths) {
    return routes.indexOf(route) === routes.length - 1 ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={'/' + paths.pop()}>{route.breadcrumbName}</Link>
    );
  }
  useEffect(
    () => console.log('set breads:', JSON.stringify(baseContext.breadList)),
    [baseContext.breadList],
  );

  return (
    <div className={styles.Breads}>
      <Breadcrumb
        separator=">"
        itemRender={itemRender}
        routes={baseContext.breadList}
      />
    </div>
  );
};

export default (props) => {
  const [breadList, setBreadList] = useState<Route[]>([]);
  return (
    <ConfigProvider locale={zhCN}>
      <BaseContext.Provider value={{ breadList, setBreadList }}>
        <div className={styles.SubPage}>
          <Menus />
          <Breads />
          <div className={styles.SubPageContainer}>{props.children}</div>
        </div>
      </BaseContext.Provider>
    </ConfigProvider>
  );
};
