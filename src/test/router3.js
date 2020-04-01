import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routerConfig from '../config/router.config';
// import BackLayout from '../layouts/BackLayout';
// import Index from '../pages';
// import Login from '../pages/login';
// import Demo from '../pages/demo';
// import NotMatch from '../components/exceptions/404';
const { routes } = routerConfig;

// const RouteConfig = (
//   <div>
//     <Switch>
//       <Route path="/login" render={props => <Login />} />
//       <Route
//         path="/"
//         render={props => (
//           <BackLayout {...props} route={{ routes }}>
//             <div>
//               <Switch>
//                 <Redirect exact path="/" to="/index" />
//                 <Route path="/index" render={props => <Index />} />
//                 <Route path="/demo" render={props => <Demo />} />
//                 <Route render={props => <NotMatch />} />
//               </Switch>
//             </div>
//           </BackLayout>
//         )}
//       ></Route>
//     </Switch>
//   </div>
// );

function InitRouter(routes) {
  console.log('init router', routes);
  return routes ? (
    <div>
      <Switch>
        {routes.map((route, i) => {
          if (route.redirect) {
            return (
              <Redirect key={route.key || i} path={route.path} to={route.redirect} exact={true} />
            );
          }
          console.log(i, route);
          return (
            <Route
              key={route.key || i}
              path={route.path}
              render={props => {
                console.log('routes', i, route);
                const childRoutes = InitRouter(route.routes);
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
}

export default InitRouter(routes);
