import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

// Some folks find value in a centralized route config.
// A route config is just data. React is great at mapping
// data into components, and <Route> is a component.

////////////////////////////////////////////////////////////
// first our route components
// const Main = () => <h2>Main</h2>;

const Sandwiches = () => <h2>Sandwiches</h2>;

const Tacos = ({ routes }) => (
  <div>
    <h2>Tacos</h2>
    <ul>
      <li>
        <Link to="/tacos/bus">Bus</Link>
      </li>
      <li>
        <Link to="/tacos/cart">Cart</Link>
      </li>
    </ul>
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Switch>
  </div>
);

const Bus = () => <h3>Bus</h3>;
const Cart = () => <h3>Cart</h3>;
const NotMatch = () => <h3>404</h3>;

////////////////////////////////////////////////////////////
// then our route config
const routes = [
  {
    path: '/sandwiches',
    component: Sandwiches,
  },
  {
    path: '/tacos',
    component: Tacos,
    routes: [
      // {
      //   path: '/tacos',
      //   redirect: '/tacos/bus',
      // },
      {
        path: '/tacos/bus',
        component: Bus,
      },
      {
        path: '/tacos/cart',
        component: Cart,
      },
      {
        component: NotMatch,
      },
    ],
  },
  {
    component: NotMatch,
  },
];

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props =>
      route.redirect ? (
        <Redirect to={route.redirect} />
      ) : (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )
    }
  />
);

const RouteConfigExample = () => (
  <div>
    <ul>
      <li>
        <Link to="/tacos">Tacos</Link>
      </li>
      <li>
        <Link to="/sandwiches">Sandwiches</Link>
      </li>
    </ul>
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Switch>
  </div>
);

export default RouteConfigExample;
