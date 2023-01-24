const express = require('express');
const sessions = require('express-session');
const HomeHandler = require('./handlers/home.js');
const LoginHandler = require('./handlers/login.js');
const ProcessLoginHandler = require('./handlers/process-login.js');
const LogoutHandler = require('./handlers/logout.js');

const app = express();



app.use(sessions({

  // secret: This is used to sign the session ID cookie. Using a secret that cannot be guessed will reduce the ability to hijack a session.
  secret: "secretKey",
  
  // cookie: Object containing the configuration for session id cookie.
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  },
  
  // resave: Forces the session to be saved back to the session store, even if the session data was never modified during the request.
  resave: true,
  
  // saveUninitialized: Forces an "uninitialized" session to be saved to the store, i.e., saves a session to the store even if the session was not initiated.
  saveUninitialized: false,
  
}));



app.use(express.json()); // middleware that parses Json
app.use(express.urlencoded({extended: true})); // middleware that parses url encoded

// @todo register routes
app.get('/', HomeHandler);
app.get('/login', LoginHandler);
app.post('/process-login', ProcessLoginHandler);
app.get('/logout', LogoutHandler);

app.listen(3000, () => {
  console.log(`Server Running at port ` + 3000);
});