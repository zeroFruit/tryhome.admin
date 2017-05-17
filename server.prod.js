const path = require('path');
const express = require('express');

const port = process.env.PORT || 8082;
const app = express();

app.use(express.static('dist'))

const INVALID_ACCESS = 'INVALID_ACCESS';

app.get('*', (req, res) => {
  return res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.use((err, req, res, next) => {
  if (err) {
    console.error('[express], [error handler]');
    console.error(err);

    res.status(503).send('Server Internal Error');
  }
})

app.listen(port, (err) => {
  if (err) {
    console.error('[express]', '[app.listen]');
    console.error(err);
  } else {
    console.log(`env: ${process.env.NODE_ENV} msg: Webpack Dev Server ${port}`);
  }
})
