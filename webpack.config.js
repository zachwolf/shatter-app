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
      loader: "css-loader!less-loader"
    }, {
      test: /\.hbs$/,
      loader: 'handlebars-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}

// test: /\.(png|jpg|gif)$/,
//   loader: "file-loader?name=img/img-[hash:6].[ext]"