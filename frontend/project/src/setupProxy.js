const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
<<<<<<< HEAD
      target: "http://192.168.0.109:8081",
=======
      target: "http://172.17.90.48:8081",

>>>>>>> 1e7740426aca6822fc6ba047b70aca97d4efc5d9
      changeOrigin: true,


    })
  );
};
