# Working

- The user sends a login request to the server.

- The server authenticates the login request, sends a session to the database, and returns a cookie containing the session ID to the user.

- Now, the user sends new requests (with a cookie).

- The server checks in the database for the ID found in the cookie, if the ID is found it sends the requested pages to the user.

Ref: https://www.geeksforgeeks.org/session-vs-token-based-authentication/