const { createProxyMiddleware } = require("http-proxy-middleware");

/**
 * Create the address client to localhost
 * @param app
 */
module.exports = function (app) {
  app.use(
    "/api/*",
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
    })
  );
};
