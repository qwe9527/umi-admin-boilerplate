import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});
app.use(require('E:/work/work/code/web/umi-admin-boilerplate/node_modules/dva-immer/lib/index.js').default());
app.model({ namespace: 'app', ...(require('E:/work/work/code/web/umi-admin-boilerplate/src/models/app.js').default) });
app.model({ namespace: 'user', ...(require('E:/work/work/code/web/umi-admin-boilerplate/src/models/user.js').default) });
