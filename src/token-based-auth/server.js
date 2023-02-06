const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv-safe').config(); // it requires that node run server in server folder

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.json({ message: "Hello!" });
})

app.get('/clientes', verifyJWT, (req, res, next) => {
    console.log("Returned all clients!");
    res.json([{ id: 1, nome: 'admin' }]);
})


app.post('/login', (req, res, next) => {

    
    // Follow lines must be doing in DB
    if (req.body.user === 'admin' && req.body.password === 'admin') {
        //auth ok
        const id = 1; // from DB
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
        });
        return res.json({ auth: true, token: token });
    }

    res.status(500).json({ message: 'Login inválido!' });
})

function verifyJWT(req, res, next) {

    const token = req.headers['x-access-token'];
    const index = blacklist.findIndex(token); // You can use TTL index in mongodb to clear blacklist
    if(index !== -1) return res.status(401).end();

    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

        // save to future use
        req.userId = decoded.id;
        next();
    });
}


const blacklist = [];

app.post('/logout', function (req, res) {
    blacklist.push(req.header['x-access-token'])
    res.json({ auth: false, token: null });
})




app.listen(3000, () => {
    console.log(`Server Running at port ` + 3000);
});