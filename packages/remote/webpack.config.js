const {
  container: { ModuleFederationPlugin },
} = require("webpack");

module.exports = {
  mode: "development",
  target: "webworker",
  devtool: false,
  devServer: {
    port: 3002,
  },
  output: {
    publicPath: "//localhost:3002/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./remote-logger": "./src/remote-logger",
      },
      remotes: {
        shared: "shared@http://localhost:3003/remoteEntry.js",
      },
    }),
  ],
};
