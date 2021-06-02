const { Users } = require("../../apis/config/sequelize_database");
const expect =require("chai").expect;
const sinon = require("sinon");
const controller = require("../../apis/components/log/controller");
const services = require("../../apis/components/log/services");

describe("LOG Controller", () => {
  const sandbox = sinon.createSandbox();
  const userData = {id:79,votes_topics:"[]",favorite_topics:"[]",friends:"[]",profile_info:"I am new to Comments App, hello!",username:"pedroramirez",profile_image:null,register_date:"2021-06-02"};

  afterEach(() => {
    sandbox.restore();
  });

  describe("Login", () => {
    it("should call service Username DB and Username/Password DB", async () => {
      const isUsernameAlreadyOnDB = sandbox.stub(services, "isUsernameAlreadyOnDB").withArgs("pedroramirez").returns(userData);     
      const isUsernamePasswordMatching = sandbox.stub(services, "isUsernamePasswordMatching").withArgs({ username: "pedroramirez", password: "boludez" }).returns(userData);
      await controller.loginUser({ session: {}, body: { username: "pedroramirez", password: "boludez" } }, { json: () => { } });

      expect(isUsernameAlreadyOnDB.withArgs("pedroramirez").calledOnce).to.be.true;
      expect(isUsernamePasswordMatching.withArgs({ username: "pedroramirez", password: "boludez" }).calledOnce).to.be.true;
    });
    describe("EXCEPTION", () => {
      it("should NOT call services Username/Passowrd DB cause the username isn't on DB", async () => {    
        const isUsernameAlreadyOnDB = sandbox.stub(services, "isUsernameAlreadyOnDB").withArgs("josecarlos").returns(null);     
        const isUsernamePasswordMatching = sandbox.spy(services, "isUsernamePasswordMatching");
        await controller.loginUser({ session: {}, body: { username: "josecarlos", password: "boludez" } }, { json: () => { } });

        expect(isUsernameAlreadyOnDB.withArgs("josecarlos").calledOnce).to.be.true;
        expect(isUsernamePasswordMatching.notCalled).to.be.true;
      })
    })
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
    it("should call services Username DB and then call Register DB", async () => {   
      const isUsernameAlreadyOnDB = sandbox.stub(services, "isUsernameAlreadyOnDB").withArgs("pedroramirez").returns(null);
      const registerUserOnDB = sandbox.stub(services, "registerUserOnDB");
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