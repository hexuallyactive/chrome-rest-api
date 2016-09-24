# chrome-rest-api

A REST API to control a Chrome/Chromium browser using the remote debugging facility.

start Chrome

google-chrome --remote-debugging-port=9991

start the express server with node index.js 

REST API is now available at http://127.0.0.1:8888

GET - list tabs
PUT - new tab
POST - activate tab
DELETE - close tab

see source for JSON params for PUT/POST/DELETE
