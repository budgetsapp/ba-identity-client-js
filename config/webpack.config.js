const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, '../dist');

module.exports = {
  entry: './src/index.js', // relative to root
  // mode: 'production',
  mode: 'development',
  output: {
    filename: 'ba-auth-api-client.js',
    path: BUILD_DIR,
    libraryTarget: 'umd',

    // globalObject: 'this' is required here, see article
    // https://medium.com/@JakeXiao/window-is-undefined-in-umd-library-output-for-webpack4-858af1b881df
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              // the 'transform-runtime' plugin tells Babel to
              // require the runtime instead of inlining it.
              '@babel/plugin-transform-runtime',
            ],
          },
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
