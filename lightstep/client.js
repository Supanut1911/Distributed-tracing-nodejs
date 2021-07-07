const http = require('http');

function makeRequest() {
   http.get({
     host: 'localhost',
     port: 9000,
     path: '/hello',
   }, (response) => {
     const body = [];
     response.on('data', (chunk) => body.push(chunk));
     response.on('end', () => {
       console.log(body.toString());
     });
   });
}

for (let i = 0; i < 5; i++) {
 makeRequest();
}