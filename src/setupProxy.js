const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/ws-system', {
      target: 'http://39.106.11.138/',
      changeOrigin: true,
    }),
  );
};
