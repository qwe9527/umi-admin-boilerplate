// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
        immer: true,
        hmr: true
      },
      dynamicImport: {webpackChunkName: true},
      title: 'xxxx',
      dll: true,
      hd: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  disableCSSModules: true,
  targets: {
    ie: 9
  },
  hash: true,
  exportStatic: {
    dynamicRoot: true,
  },
  copy: [
    {
      "from": "./src/assets/favicon.ico",
      "to": "./"
    }
  ],
  chainWebpack(config) {
    config
      .when(process.env.NODE_ENV === 'production', cfg => {
        cfg.merge({
          plugin: {
            install: {
              plugin: require('uglifyjs-webpack-plugin'),
              args: [{
                sourceMap: false,
                uglifyOptions: {
                  compress: {
                    // 删除所有的 `console` 语句
                    drop_console: true,
                  },
                  output: {
                    // 最紧凑的输出
                    beautify: false,
                    // 删除所有的注释
                    comments: false,
                  },
                }
              }]
            }
          }
        })
      });
  },
}
