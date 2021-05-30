const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const { Users } = require("../../apis/config/sequelize_database");
const expect = chai.expect;
const sinon = require("sinon");
const controller = require("../../apis/components/log/controller");
const services = require("../../apis/components/log/services");

describe("LOG Controller", () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  describe("", () => {



  });
});