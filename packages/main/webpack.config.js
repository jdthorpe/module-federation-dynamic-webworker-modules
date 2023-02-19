const {
  container: { ModuleFederationPlugin },
} = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  // NOTE: commenting out this line will prevent the importScripts chunk loader from conflicting with the remote loader.
  // target: 'webworker',
  devtool: false,
  devServer: {
    port: 3001,
  },
  output: {
    publicPath: "//localhost:3001/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "main",
      remotes: {
        remote: "remote@//localhost:3002/remoteEntry.js",
        shared: "shared@//localhost:3003/remoteEntry.js",
      },
    }),
    new CopyPlugin({
      patterns: [{ from: "public" }],
    }),
  ],
};
