let config = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader'
        ]
      }
    ]
  }
};

module.exports = config;
