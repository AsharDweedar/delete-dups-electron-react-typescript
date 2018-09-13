var isProduction =
  process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production'
var path = require('path')

var HtmlWebpackPlugin = require('html-webpack-plugin');
// var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
      rules: [{
          test: /\.(tsx|ts)?$/,
          use: [
              !isProduction && {
                  loader: 'babel-loader',
                  options: { plugins: ['react-hot-loader/babel'] }
              },
              'ts-loader'
          ].filter(Boolean)
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      { test: /\.html$/, use: 'html-loader' },
      //   {
      //     test: /\.(png|svg|jpg|gif)$/,
      //     use: ['file-loader']
      //   },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
      new WebpackCleanupPlugin(['dist']) 
    //   new CleanWebpackPlugin(['dist']), 
    //   new CleanWebpackPlugin(['dist']), 
      // new HTMLWebpackPlugin()
    ]
}
