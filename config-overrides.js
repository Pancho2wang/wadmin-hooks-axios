const { override, fixBabelImports, addLessLoader, addWebpackPlugin } = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

/* module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
}; */

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#0e78d5',
      // '@layout-header-height': 'calc(44px + 2vmin)',
      // '@layout-footer-padding': '2vmin calc(24px + 2vmin)',
    },
  }),
  addWebpackPlugin(new AntdDayjsWebpackPlugin()),
);
