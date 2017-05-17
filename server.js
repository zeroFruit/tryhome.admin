const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config');

const port = process.env.PORT || 8082;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Webpack Dev Server ${port}`);
  }
})
