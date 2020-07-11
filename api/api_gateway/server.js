const { SceHttpServer } = require('../util/SceHttpServer');

function main() {
  const API_ENDPOINTS = __dirname + '/routes/api_gateway.js';
  const apiGateway = new SceHttpServer(API_ENDPOINTS, 8084, '/');
  apiGateway.initializeEndpoints().then(() => {
    apiGateway.openConnection();
  });
}

main();
