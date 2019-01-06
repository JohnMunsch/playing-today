const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './app/js/playing-today-app.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'app/index.template.html',
      hash: true
    })
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'app')
  }
};
