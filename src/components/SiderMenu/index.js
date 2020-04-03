import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { useStore } from '../../utils/store';
import './index.less';
import { getIcon } from '../common/icons';
import logo from '../../assets/images/logo.svg';

const { Sider } = Layout;
const { SubMenu, Item: MenuItem } = Menu;

function getDefaultOpenKeys(pathArr, len, deep, keys = []) {
  if (deep >= len) return keys;
  const tempPathArr = pathArr.slice(0, deep);
  const tempPath = tempPathArr.join('/');
  keys.push(tempPath);
  return getDefaultOpenKeys(pathArr, len, ++deep, keys);
}

function isAuthority(authority, permissions) {
  if (!permissions || permissions.length === 0) return false;
  if (!authority || authority.length === 0) return true;
  let flag = false;
  for (let authKey of authority) {
    if (permissions.indexOf(authKey) > -1) {
      flag = true;
      break;
    }
  }
  return flag;
}

function getNavMenu(routes, subMenuKeys = [], permissions = []) {
  return routes.map(route => {
    const {
      redirect,
      hideInMenu,
      hideChilrenInMenu,
      name,
      path,
      icon,
      routes: subRoutes,
      authority,
    } = route;
    if (redirect || hideInMenu || !name || !isAuthority(authority, permissions)) return null;
    if (subRoutes && !hideChilrenInMenu) {
      subMenuKeys.push(path);
      return (
        <SubMenu
          key={path}
          title={
            <span>
              {getIcon(icon)}
              <span>{name}</span>
            </span>
          }
        >
          {getNavMenu(subRoutes, subMenuKeys, permissions)}
        </SubMenu>
      );
    }
    return (
      <MenuItem key={path}>
        {getIcon(icon)}
        <Link to={path}>{name}</Link>
      </MenuItem>
    );
  });
}

export default function(props) {
  const { routes, pathname } = props;
  const [collapsed, setCollapsed] = useState(false);
  const paths = pathname.split('/');
  const oKeys = getDefaultOpenKeys(paths, paths.length, 2, []);
  const [openKeys, setOpenKeys] = useState([...oKeys]);
  let subMenuKeys = [];
  const changeOpenKeys = useCallback(() => {
    const paths = pathname.split('/');
    const oKeys = getDefaultOpenKeys(paths, paths.length, 2, []);
    setOpenKeys(collapsed ? [] : oKeys);
  }, [pathname, collapsed]);
  const [state] = useStore('global');
  const { permissions } = state;

  useEffect(() => {
    changeOpenKeys();
  }, [changeOpenKeys]);
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <div>
        <Link to="/">
          <img src={logo} className="logo" alt="logo" />
        </Link>
      </div>
      <Menu
        theme="dark"
        openKeys={openKeys}
        onOpenChange={oKeys => {
          const latestOpenKey = oKeys.find(key => oKeys.indexOf(key) === -1);
          if (subMenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(oKeys);
          } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
          }
        }}
        selectedKeys={[pathname]}
        // defaultOpenKeys={openKeys}
        // defaultSelectedKeys={[pathname]}
        mode="inline"
        // inlineCollapsed={collapsed}
      >
        {getNavMenu(routes, subMenuKeys, permissions)}
      </Menu>
    </Sider>
  );
}
