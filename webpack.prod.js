const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(ts|tsx)?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.scss', '.js', '.json', ".tsx"],
    alias: {
      global: path.resolve('private_modules/global'),
      database: path.resolve('src/database'),
      custom_elements: path.resolve('src/custom_elements'),
    },
  },
  optimization: {
    usedExports: true,
  },
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true
  },
  plugins: [new HtmlWebpackPlugin({
    template: "public/index.html",
    hash: true, // cache busting
    filename: '../dist/index.html'
  }),
  new Dotenv({
    path: './.env', // Path to .env file (this is the default)
    safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
  })]
}