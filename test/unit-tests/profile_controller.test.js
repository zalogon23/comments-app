const expect = require("chai").expect;
const sinon = require("sinon");
const controller = require("../../apis/components/profile/controller");
const services = require("../../apis/components/profile/services");

describe("PROFILE Controller", () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  })
  it("should call services to GET User Data", () => {
    const getUserDataDB = sandbox.spy(services, "getUserDataDB");
    controller.askForUserData({ session: { userID: 10 } }, { json: () => { } });

    expect(getUserDataDB.withArgs(10).calledOnce).to.be.true;
  });
  it("should call services to UPDATE Profile Info (And avoid quotation)", () => {
    const updateUserInfoDB = sandbox.spy(services, "updateUserInfoDB");
    controller.updateUserInfo({ session: { userID: 10 }, body: { info: "U'''''n te`st mu`y test`ead'''o\"r, dig\"amos" } }, { json: () => { } });

    expect(updateUserInfoDB.withArgs(10, "Un test muy testeador, digamos").calledOnce).to.be.true;
  });
  it("should call services to UPDATE Profile Image", () => {
    const updateAvatarDB = sandbox.spy(services, "updateAvatarDB");
    controller.updateAvatar({ session: { userID: 10 }, file: { path: "pedro/de/jujuyviejo" } }, { json: () => { } });

    expect(updateAvatarDB.withArgs(10, "pedro/de/jujuyviejo").calledOnce).to.be.true;
  });
  describe("EXCEPTIONS:", () => {
    it("should NOT call services to GET User Data (No Session ID)", () => {
      const getUserDataDB = sandbox.spy(services, "getUserDataDB");
      controller.askForUserData({ session: null }, { json: () => { } });

      expect(getUserDataDB.notCalled).to.be.true;
    });
    it("should NOT call services to UPDATE User Info (No Session ID)", () => {
      const updateUserInfoDB = sandbox.spy(services, "updateUserInfoDB");
      controller.updateUserInfo({ session: null, body: { info: "Un test muy testeador, digamos" } }, { json: () => { } });

      expect(updateUserInfoDB.notCalled).to.be.true;
    });
    it("should NOT call services to UPDATE Profile Image (No Session ID)", () => {
      const updateAvatarDB = sandbox.spy(services, "updateAvatarDB");
      controller.updateAvatar({ session: null, file: { path: "pedro/de/jujuyviejo" } }, { json: () => { } });

      expect(updateAvatarDB.notCalled).to.be.true;
    });
  });
});