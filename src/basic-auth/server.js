const express = require('express');
const authMiddleware = require('./auth');
const path = require('path');


const app = express();
const port = 3000;

app.use(authMiddleware);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '\\index.html'));

});

app.listen(port, () => {
  console.log(`App running @ http://localhost:${port}`);
})