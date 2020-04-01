import React, { Fragment } from 'react';
import { Breadcrumb } from 'antd';

const BreadcrumbItem = Breadcrumb.Item;
const BreadcrumbSeparator = Breadcrumb.Separator;

const getBreadcrumbItem = (pathArr, len, routes = [], deep) => {
  if (deep > len) return null;
  const tempPathArr = pathArr.slice(0, deep);
  const tempPath = tempPathArr.join('/');
  const route = routes.find(item => item.path === tempPath);
  if (!route) return null;
  return (
    <Fragment>
      <BreadcrumbItem>{route.name}</BreadcrumbItem>
      {deep !== len ? (
        <Fragment>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          {getBreadcrumbItem(pathArr, len, route.routes, ++deep)}
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default props => {
  const {
    location: { pathname },
    route: { routes },
  } = props;
  const paths = pathname.split('/');
  return (
    <Breadcrumb style={{ margin: '16px 0' }} separator="">
      <BreadcrumbItem>当前位置</BreadcrumbItem>
      <BreadcrumbSeparator>:</BreadcrumbSeparator>
      {getBreadcrumbItem(paths, paths.length, routes, 2)}
    </Breadcrumb>
  );
};
