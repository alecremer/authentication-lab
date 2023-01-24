# Working

- The user sends a login request to the server.

- The server authorizes the login and sends a token to the user.

- Now, the user sends a new request(with a token).

- The server checks the token is valid or not, if the token is valid it sends the requested pages to the user.

Note- Those are not authentication files, they are authorization ones. While receiving a token, the server does not look up who the user is, it simply authorizes the user’s requests relying on the validity of the token.


Usually JWTs (JSON Web Token) are used for this


Ref: 
https://www.geeksforgeeks.org/session-vs-token-based-authentication/
https://www.okta.com/identity-101/what-is-token-based-authentication/
https://jwt.io/introduction/