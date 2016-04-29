var webpack = require('webpack')
  , HtmlWebpackPlugin = require('html-webpack-plugin')
  , path = require('path')

module.exports = {
  debug: true,
  entry: {
    app: './src/js/app.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.less$/,
      // loader: "css-loader!less-loader!file-loader"
      loader: "style-loader!css-loader!less-loader"
    }, {
      test: /\.hbs$/,
      loader: 'handlebars-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}