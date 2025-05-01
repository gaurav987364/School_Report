import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true
    }).on('proxyRes', function(proxyRes) {
      proxyRes.headers['Cache-Control'] = 'no-store';
    })
  );
};