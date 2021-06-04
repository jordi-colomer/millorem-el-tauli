module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        //target: "http://localhost:5000",
        target: "https://millorem-el-tauli-be.herokuapp.com",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: { "^/api": "/api" },
      },
    },
  },
};
