const express = require('express');
const app = express();

app.get('/', (req, res) => {
  return res.send('Hello, World!!!');
});

app.listen( 3000, () => {
  console.log('Listening at port 3000...');
});