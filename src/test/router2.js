import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import BackLayout from '../layouts/BackLayout';
import Index from '../pages';
import Login from '../pages/login';
import Demo from '../pages/demo';
import NotMatch from '../components/exceptions/404';

import routerConfig from '../config/router.config';
const { routes } = routerConfig;

const RouteConfig = (
  <div>
    <Switch>
      <Route path="/login" render={props => <Login />} />
      <Route
        path="/"
        render={props => (
          <BackLayout {...props} route={{ routes }}>
            <div>
              <Switch>
                <Redirect exact path="/" to="/index" />
                <Route path="/index" render={props => <Index />} />
                <Route path="/demo" render={props => <Demo />} />
                <Route render={props => <NotMatch />} />
              </Switch>
            </div>
          </BackLayout>
        )}
      >
        {/* <div>
          <Switch>
            <Redirect exact path="/" to="/index" />
            <Route
              path="/index"
              render={props => (
                <BackLayout {...props} route={{ routes }}>
                  <Index />
                </BackLayout>
              )}
            />
            <Route
              path="/demo"
              render={props => (
                <BackLayout {...props} route={{ routes }}>
                  <Demo />
                </BackLayout>
              )}
            />
            <Route
              render={props => (
                <BackLayout {...props} route={{ routes }}>
                  <NotMatch />
                </BackLayout>
              )}
            />
          </Switch>
        </div> */}
      </Route>
      {/* <Route component={NotMatch} /> */}
    </Switch>
  </div>
);

export default RouteConfig;
