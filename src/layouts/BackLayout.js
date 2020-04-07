import React, { useState, useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import useSWR from 'swr';
import { stringify } from 'querystring';
import { Layout, Card } from 'antd';
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
  if (!appStorage || !appStorage.isLogin)
    return (
      <Redirect
        to={`/login?${stringify({
          redirect: pathname,
        })}`}
      ></Redirect>
    );
  /* if (!isLogin) {
    console.log('isLogin', state, isLogin, appStorage);
    dispatch({ type: 'updateState', payload: { user: appStorage } });
  } */
  useEffect(() => {
    if (!isLogin) {
      dispatch({ type: 'updateState', payload: { user: appStorage } });
    }
  }, [dispatch, appStorage, isLogin]);

  const { data } = useSWR('sys.fakeAuthorityList', fetch);
  const { menuList, permissions } = data || {};
  const [isAuthority, setIsAuthority] = useState(false);

  useEffect(() => {
    dispatch({ type: 'updateState', payload: { permissions } });
  }, [dispatch, permissions]);

  useEffect(() => {
    const { authoritys } = getAuthority(pathname, routes);
    const flag = compareAuthority(authoritys, permissions);
    setIsAuthority(flag);
  }, [pathname, routes, permissions]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* {SiderMenu({ routes, pathname, menuList })} */}
      <SiderMenu {...{ routes, pathname, menuList }} />
      <Layout>
        <Header {...props} />
        <Content className="mx-15">
          {data ? (
            isAuthority ? (
              <Fragment>
                <Breadcrumb {...props} />
                <Card bordered={false}>{children}</Card>
              </Fragment>
            ) : (
              <NoMatch />
            )
          ) : null}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};
