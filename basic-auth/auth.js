const base64 = require("base-64");


function decodeCredentials(authHeader) {

    // exclude type Basic of header
    const encodedCredentials = authHeader.trim().replace(/Basic\s+/i, '');
    const decodeCredentials = base64.decode(encodedCredentials);

    return decodeCredentials.split(':');

}

module.exports = function authCredentials(req, res, next) {
    // Take the header and decode credentials 
    const [username, password] = decodeCredentials(req.headers.authorization || '');
    console.log(req.query)
    
    // Verify the credentials
    if (username === 'admin' && password === 'admin') {
        return next();
    }

    

    // Respond with authenticate header on auth failure.
    res.set('WWW-Authenticate', 'Basic realm="user_pages"');
    res.status(401).send('Authentication required.');
}