import React, { useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

const renderRoutes = (routes, extraProps = {}, switchProps = {}) => {
  return routes ? (
    <div>
      <Switch {...switchProps}>
        {routes.map((route, i) => {
          if (route.redirect) {
            return <Redirect exact key={route.key || i} path={route.path} to={route.redirect} />;
          }
          return (
            <Route
              key={route.key || i}
              path={route.path}
              exact={route.exact}
              render={props => {
                const childRoutes = renderRoutes(route.routes, extraProps, {
                  location: props.location,
                });
                if (route.component) {
                  const { component: Component } = route;
                  return (
                    <Component {...props} route={route}>
                      {childRoutes}
                    </Component>
                  );
                }
                return childRoutes;
              }}
            />
          );
        })}
      </Switch>
    </div>
  ) : null;
};

// 路由跳转页面回到顶部，当前页面刷新页面无法回到顶部
const ScrollToTop = withRouter(props => {
  const {
    location: { pathname },
  } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children;
});

export default props => <ScrollToTop>{renderRoutes(props.routes)}</ScrollToTop>;
