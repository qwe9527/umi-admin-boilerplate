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
        "_title": "xxxx",
        "_title_default": "xxxx"
      },
      {
        "path": "/",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__index" */'../index.js'),
  
}),
        "_title": "xxxx",
        "_title_default": "xxxx"
      },
      {
        "path": "/Login",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__Login__index" */'../Login/index.js'),
  
}),
        "_title": "xxxx",
        "_title_default": "xxxx"
      },
      {
        "path": "/test",
        "exact": true,
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__test__models__test.js' */'E:/work/work/code/web/umi-admin-boilerplate/src/pages/test/models/test.js').then(m => { return { namespace: 'test',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__test__index" */'../test/index.js'),
  
}),
        "_title": "xxxx",
        "_title_default": "xxxx"
      },
      {
        "path": "/test/config",
        "exact": true,
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__test__models__test.js' */'E:/work/work/code/web/umi-admin-boilerplate/src/pages/test/models/test.js').then(m => { return { namespace: 'test',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__test__config" */'../test/config.js'),
  
}),
        "_title": "xxxx",
        "_title_default": "xxxx"
      },
      {
        "component": () => React.createElement(require('E:/work/work/code/web/umi-admin-boilerplate/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
        "_title": "xxxx",
        "_title_default": "xxxx"
      }
    ],
    "_title": "xxxx",
    "_title_default": "xxxx"
  },
  {
    "component": () => React.createElement(require('E:/work/work/code/web/umi-admin-boilerplate/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
    "_title": "xxxx",
    "_title_default": "xxxx"
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
