const expect = require("chai").expect;
const { Users } = require("../../apis/config/sequelize_database");
const sinon = require("sinon");
const controller = require("../../apis/components/friends/controller");
const services = require("../../apis/components/friends/services");

describe("FRIENDS Controller", () => {
  const sandbox = sinon.createSandbox();
  const userData = {id:79,votes_topics:"[]",favorite_topics:"[]",friends:"[]",profile_info:"I am new to Comments App, hello!",username:"pedroramirez",profile_image:null,register_date:"2021-06-02"};


  afterEach(() => {
    sandbox.restore();
  });

  it("should call services get Friends IDs and get User Data", async () => {
    const getFriendIDs = sandbox.stub(services, "getFriendIDs").withArgs(79).returns({ "friends": "[1,2,3]"});
    const getUserData = sandbox.stub(services, "getUserData");
    await controller.getAllFriendsOf({ session: { userID: 79 } }, { json: () => { } });

    expect(getFriendIDs.withArgs(79).calledOnce).to.be.true;
    expect(getUserData.calledThrice).to.be.true;
  });
  it("should call service get Friends IDs but NOT get User Data (cause there are no friends)", async () => {
    const getFriendIDs = sandbox.stub(services, "getFriendIDs").withArgs(79).returns({ "friends": "[]"});
    const getUserData = sandbox.stub(services, "getUserData");
    await controller.getAllFriendsOf({ session: { userID: 79 } }, { json: () => { } });

    expect(getFriendIDs.withArgs(79).calledOnce).to.be.true;
    expect(getUserData.notCalled).to.be.true;
  });
  describe("EXCEPTIONS", () => {
    it("should NOT call any service cause there not userID", async () => {     
    const getFriendIDs = sandbox.spy(services, "getFriendIDs");
    const getUserData = sandbox.spy(services, "getUserData");
    await controller.getAllFriendsOf({ session: { } }, { json: () => { } });

    expect(getFriendIDs.notCalled).to.be.true;
    expect(getUserData.notCalled).to.be.true;
    }) 
  })
});