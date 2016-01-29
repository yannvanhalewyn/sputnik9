var webpack = require('webpack')
  , _ = require('lodash');

var base = {
  entry: {
    premium: './app/js/premium/index.js',
    admin: './app/js/admin/index.jsx'
  },
  output: {
    path: './public/js',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  externals: {
    react: 'React',
    lodash: '_',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter'
  }
}

var env_config = {
  'production': {
    plugins: [ new webpack.optimize.UglifyJsPlugin() ]
  },
  'development': {
    devtool: '#inline-source-map'
  }
}

_.merge(module.exports, base, env_config[process.env.NODE_ENV || 'development'])
