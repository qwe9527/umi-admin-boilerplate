import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import _dvaDynamic from 'dva/dynamic'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__index" */'../../layouts/index.js'),
  
}),
    "routes": [
      {
        "path": "/index.html",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__index" */'../index.js'),
  
}),
        "_title": "慧能源扬尘监控管理平台",
        "_title_default": "慧能源扬尘监控管理平台"
      },
      {
        "path": "/",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__index" */'../index.js'),
  
}),
        "_title": "慧能源扬尘监控管理平台",
        "_title_default": "慧能源扬尘监控管理平台"
      },
      {
        "path": "/Login",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__Login__index" */'../Login/index.js'),
  
}),
        "_title": "慧能源扬尘监控管理平台",
        "_title_default": "慧能源扬尘监控管理平台"
      },
      {
        "component": () => React.createElement(require('E:/work/work/code/web/dust-monitor/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
        "_title": "慧能源扬尘监控管理平台",
        "_title_default": "慧能源扬尘监控管理平台"
      }
    ],
    "_title": "慧能源扬尘监控管理平台",
    "_title_default": "慧能源扬尘监控管理平台"
  },
  {
    "component": () => React.createElement(require('E:/work/work/code/web/dust-monitor/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
    "_title": "慧能源扬尘监控管理平台",
    "_title_default": "慧能源扬尘监控管理平台"
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
