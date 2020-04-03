import React, { useState, useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import useSWR from 'swr';
import { stringify } from 'querystring';
import { Layout, Spin } from 'antd';
import { getStorage } from '../utils/storage';
import { fetch } from '../services';
import { useStore } from '../utils/store';
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import Breadcrumb from '../components/common/breadcrumb';
import SiderMenu from '../components/SiderMenu';
import NoMatch from '../components/exceptions/403';

const { Content } = Layout;

function getAuthority(pathname, routes) {
  let authoritys = [];
  let isEqual = false;
  for (let route of routes) {
    if (route.path === pathname) {
      authoritys = route.authority;
      isEqual = true;
      break;
    } else if (route.routes && route.routes.length > 0) {
      const { authoritys: tempAuthoritys, isEqual: tempIsEqual } = getAuthority(
        pathname,
        route.routes,
      );
      if (tempIsEqual) {
        authoritys = tempAuthoritys;
        isEqual = tempIsEqual;
        break;
      }
    }
  }
  return { authoritys, isEqual };
}

function compareAuthority(authority, permissions = []) {
  if (!authority || authority.length === 0) return true;
  for (let key of authority) {
    if (permissions.indexOf(key) > -1) {
      return true;
    }
  }
  return false;
}

export default props => {
  const {
    route: { routes },
    children,
    location: { pathname },
  } = props;
  const appStorage = getStorage();
  const [state, dispatch] = useStore('global');
  const {
    user: { isLogin },
  } = state;
  if (!appStorage || !appStorage.isLogin) {
    return (
      <Redirect
        to={`/login?${stringify({
          redirect: pathname,
        })}`}
      ></Redirect>
    );
  } else if (!isLogin) {
    dispatch({ type: 'updateState', payload: { user: appStorage } });
  }

  const { data } = useSWR('sys.fakeAuthorityList', fetch);
  const { menuList, permissions } = data || {};
  const [isAuthority, setIsAuthority] = useState(false);
  useEffect(() => {
    const { authoritys } = getAuthority(pathname, routes);
    const flag = compareAuthority(authoritys, permissions);
    setIsAuthority(flag);
    return () => {};
  }, [pathname, routes, permissions]);
  useEffect(() => {
    dispatch({ type: 'updateState', payload: { permissions } });
    return () => {};
  }, [permissions, dispatch]);

  return (
    <Spin tip="Loading..." spinning={!isLogin}>
      <Layout style={{ minHeight: '100vh' }}>
        {SiderMenu({ routes, pathname, menuList })}
        <Layout className="site-layout">
          <Header {...props} />
          <Content style={{ margin: '0 16px' }}>
            {data ? (
              isAuthority ? (
                <Fragment>
                  <Breadcrumb {...props} />
                  <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    {children}
                  </div>
                </Fragment>
              ) : (
                <NoMatch />
              )
            ) : null}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Spin>
  );
};
