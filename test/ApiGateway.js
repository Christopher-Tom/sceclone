const { initializeRoutes } =
  require('../api/api_gateway/routes/util/initializeRoutes');
const chai = require('chai');
const chaiHttp = require('chai-http');
const {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND
} = require('../api/util/constants').STATUS_CODES;
const SceApiTester = require('../test/util/tools/SceApiTester');

let app = null;
let test = null;
const expect = chai.expect;
// tools for testing
const tools = require('./util/tools/tools.js');
const {
  setTokenStatus,
  resetMock,
  restoreMock,
  initializeMock
} = require('./util/mocks/TokenValidFunctions');
const testEndpoints = [
  { route: '/api/Fake/ProtectedPost', url: '', protected: true, post: true },
  { route: '/api/Fake/UnprotectedPost', url: '', protected: false, post: true },
  { route: '/api/Fake/ProtectedGet', url: '', protected: true, post: false },
  { route: '/api/Fake/UnprotectedGet', url: '', protected: false, post: false }
];

chai.should();
chai.use(chaiHttp);

describe('ApiGateway', () => {
  before(done => {
    initializeMock();
    app = tools.initializeServer(
      __dirname + '/../api/main_endpoints/routes/3DPrintingForm.js');
    test = new SceApiTester(app);
    tools.emptySchema(PrintingForm3D);
    done();
  });

  after(done => {
    restoreMock();
    tools.terminateServer(done);
  });

  beforeEach(() => {
    setTokenStatus(false);
  });

  afterEach(() => {
    resetMock();
  });
  testEndpoints.map((route) => {
    if (route.protected) {
        describe('Protected Route: ' + route.route);
        it('Should return 403 when an invalid token is supplied', async () => {
          setTokenStatus(false);
          const result = (route.post) ?
            await test.sendPostRequest(route.url + route.route) :
            await test.sendGetRequest(route.url + route.route);
          expect(result).to.have.status(FORBIDDEN);
        });
        it('Should reuturn 200 when valid token is supplied', async () => {
          setTokenStatus(true);
          const result = (route.post) ?
            await test.sendPostRequest(route.url + route.route) :
            await test.sendGetRequest(route.url + route.route);
          expect(result).to.have.status(OK);
        });
    }
    if (route.post) {
      describe('Post Request: ' + route.route);
      it('Should return 200 when trying to send a post request', async () =>{
        const result = await test.sendPostRequest(route.url + route.route);
        expect(result).to.have.status(OK);
      });
      it('Should return 404 when trying to send a get request', async () =>{
        const result = await test.sendGetRequest(route.url + route.route);
        expect(result).to.have.status(NOT_FOUND);
      });
    }
    if (route.get) {
      describe('Get Request: ' + route.route);
      it('Should return 200 when trying to send a get request', async () =>{
        const result = await test.sendGetRequest(route.url + route.route);
        expect(result).to.have.status(OK);
      });
      it('Should return 404 when trying to send a get request', async () =>{
        const result = await test.sendPostRequest(route.url + route.route);
        expect(result).to.have.status(NOT_FOUND);
      });
    }
  });
  
});
