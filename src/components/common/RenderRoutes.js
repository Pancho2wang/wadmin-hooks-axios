import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

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

export default props => {
  return renderRoutes(props.routes);
};
