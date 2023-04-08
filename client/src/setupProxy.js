const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use( ["/api", "/auth/google"],
    createProxyMiddleware({
      target: 'http://localhost:5000', // in production relative url will work automaticall we dont need to procy them
      changeOrigin: true,
    })
  );
};