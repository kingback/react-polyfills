const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const alias = {
  'react$': require.resolve('react'),
  'react-dom': require.resolve('react-dom'),
};

glob.sync('./packages/*/src/index.js').forEach(file => {
  const pkg = file.match(/\.\/packages\/([^\/]+)\/src/)[1];
  alias[pkg] = path.resolve(__dirname, file);
});

module.exports = {
  mode: 'development',
  entry: './demo/index.js',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/demo/',
    filename: 'index.js'
  },
  watch: true,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    inline: true,
    hot: true,
    headers: {
      "Cache-Control": "no-cache"
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          "presets": [
            ["@babel/preset-env"],
            "@babel/preset-react"
          ],
          "plugins": ["@babel/plugin-proposal-class-properties"]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template/index.html'
    })
  ],
  resolve: {
    alias
  }
}