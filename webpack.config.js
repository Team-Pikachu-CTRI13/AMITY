const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/client/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        exclude: /(node_modules)/,
        use: ['style-loader', 'css-loader'],
      },
      // {
      //   test: /\.mjs$/,
      //   include: /node_modules/,
      //   type: "javascript/auto",
      // },
      {
        test: /\.png|svg|jpg|gif$/,
        // Add here the exclude attribute
        exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    port: 3000,
    static: path.resolve(__dirname, './dist'),
    historyApiFallback: true,
  },
};
