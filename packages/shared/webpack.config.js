const {
  container: { ModuleFederationPlugin },
} = require("webpack");

module.exports = {
  mode: "development",
  target: "webworker",
  devtool: false,
  devServer: {
    port: 3003,
  },
  output: {
    publicPath: "//localhost:3003/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shared",
      filename: "remoteEntry.js",
      exposes: {
        "./counter": "./src/counter",
      },
    }),
  ],
};
