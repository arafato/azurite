const chai = require('chai'),
  chaiHttp = require('chai-http'),
  should = chai.should(),
  expect = chai.expect,
  BbPromise = require('bluebird'),
  fs = BbPromise.promisifyAll(require('fs-extra')),
  Azurite = require('./../lib/AzuriteTable'),
  rp = require('request-promise'),
  path = require('path'),
  xml2js = require('xml2js');

chai.use(chaiHttp);

const containerName = 'testcontainer';
const tableName = 'testtable';

const url = 'http://localhost:10002';
const urlPath = '/devstoreaccount1';

describe('Table HTTP API', () => {
  const azurite = new Azurite();

  before(() => {
    const location = path.join(process.env.AZURITE_LOCATION, 'TABLE');
    return azurite.init({ l: location, silent: 'true', overwrite: 'true' });
  });

  after(() => {
    return azurite.close();
  });

  describe('List tables', () => {
    it("doesn't blow up when listing tables", () =>
      chai
        .request(url)
        .get(`${urlPath}/Tables`)
        .accept('application/json;odata=nometadata;charset=utf-8')
        .send()
        .then(res => {
          res.should.have.status(200);
        }));
  });
});
