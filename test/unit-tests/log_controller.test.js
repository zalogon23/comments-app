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

  describe("Login", () => {
    it("should call service Username Match", async () => {
      const isUsernameAlreadyOnDB = sandbox.spy(services, "isUsernameAlreadyOnDB");
      await controller.loginUser({ session: {}, body: { username: "pedroramirez", password: "luquitasdelpueblo" } }, { json: () => { } });

      expect(isUsernameAlreadyOnDB.withArgs("pedroramirez").calledOnce).to.be.true;
    });
    it("should call service Password Match", async () => {
      const isUsernamePasswordMatching = sandbox.spy(services, "isUsernamePasswordMatching");
      await controller.loginUser({ session: {}, body: { username: "Newby", password: "boludez" } }, { json: () => { } });

      expect(isUsernamePasswordMatching.withArgs({ username: "Newby", password: "boludez" }).calledOnce).to.be.true;
    });
  });

  describe("Logout", () => {
    let req, res;

    beforeEach(() => {
      req = {
        session: {
          userID: 1,
          destroy: () => { }
        }
      };
      res = {
        clearCookie: () => { },
        json: () => { }
      };
    })

    it("should call its methods", () => {
      const destroySession = sandbox.spy(req.session, "destroy");
      const clearCookie = sandbox.spy(res, "clearCookie");
      controller.logoutUser(req, res);

      expect(clearCookie.withArgs("connect.sid").calledOnce).to.be.true;
      expect(destroySession.calledOnce).to.be.true;
    });
    describe("EXCEPTION", () => {
      it("should NOT call its methods WHEN theres no User ID", () => {
        const destroySession = sandbox.spy(req.session, "destroy");
        const clearCookie = sandbox.spy(res, "clearCookie");
        req.session.userID = null;
        controller.logoutUser(req, res);

        expect(clearCookie.notCalled).to.be.true;
        expect(destroySession.notCalled).to.be.true;
      });
    })
  });

  describe("Register", () => {
    it("should call service Username (check if exists)", async () => {
      const isUsernameAlreadyOnDB = sandbox.spy(services, "isUsernameAlreadyOnDB");
      await controller.registerUser({ body: { username: "pedroramirez", password: "luquitasdelpueblo" } }, { json: () => { } });

      expect(isUsernameAlreadyOnDB.withArgs("pedroramirez").calledOnce).to.be.true;
    });
    it("should call service Register (to add on DB)", async () => {
      await Users.destroy({ where: { username: "pedroramirez" } });
      const registerUserOnDB = sandbox.spy(services, "registerUserOnDB");
      await controller.registerUser({ body: { username: "pedroramirez", password: "luquitasdelpueblo" } }, { json: () => { } });
      
      const register_date = new Date().toISOString().slice(0, 10);
      expect(registerUserOnDB.withArgs({ username: "pedroramirez", password: "luquitasdelpueblo", register_date }).calledOnce).to.be.true;
    });
    describe("EXCEPTIONS", () => {
      it("should NOT call service Username (cause the providen is too short)", async () => {
        const isUsernameAlreadyOnDB = sandbox.spy(services, "isUsernameAlreadyOnDB");
      await controller.registerUser({ body: { username: "pedr", password: "luquitasdelpueblo" } }, { json: () => { } });

      expect(isUsernameAlreadyOnDB.notCalled).to.be.true;
      })
    })
  });
});