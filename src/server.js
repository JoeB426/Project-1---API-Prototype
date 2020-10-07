const http = require('http');

const url = require('url');

const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// // handle GET requests
// const handleGet = (request, response, parsedUrl) => {
//   if (parsedUrl.pathname === '/') {
//     htmlHandler.getIndex(request, response);
//   } else if (parsedUrl.pathname === '/style.css') {
//     htmlHandler.getCSS(request, response);
//   }
// };

// const onRequest = (request, response) => {
//   const parsedUrl = url.parse(request.url);

//   if (request.method === 'GET') {
//     handleGet(request, response, parsedUrl);
//   }
// };

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  const params = query.parse(parsedUrl.query);

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params);
  }
};

http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
