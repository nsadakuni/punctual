const path = require('path')

module.exports = {
  mode: "development",
  entry: path.join(__dirname, '/client/src/index.jsx'),
  output: {
    path: path.join(__dirname, "/client/dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  // resolve: {
  //   fallback: {
  //     "assert": false,
  //     "fs": false,
  //     "tls": false,
  //     "net": false,
  //     "path": false,
  //     "zlib": false,
  //     "http": false,
  //     "https": false,
  //     "os": false,
  //     "querystring": false,
  //     "stream": false,
  //     "url": false,
  //     "crypto": false,
  //     "crypto-browserify": false
  //   }
  // },
}