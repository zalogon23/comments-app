const { Topics } = require("../../apis/config/sequelize_database");
const expect = require("chai").expect;
const sinon = require("sinon");
const controller = require("../../apis/components/topics/controller");
const services = require("../../apis/components/topics/services");

describe("TOPICS Controller", () => {
  const sandbox = sinon.createSandbox();
  const reqRes = [{
    body: { id: 10, subject: "Perro viejo", intro: "La conchetumare viejo" }, //Topic mock info
    session: { userID: 79 }, // User Mock info
    params: { id: 2 } //Mock comment query id
  }, {
    json: value => { reqRes[1].value = value },
    value: null
  }];
  const reqResNOUser = [{
    body: { id: 10, subject: "Perro viejo", intro: "La conchetumare viejo" }, 
    session: { }, 
    params: { id: 2 }
  }, {
    json: value => { reqRes[1].value = value },
    value: null
  }];

  afterEach(() => {
    sandbox.restore();
  });

  it("should call service toggleFavoriteTopic", async () => {
    const toggleFavoriteTopic = sandbox.stub(services, "toggleFavoriteTopic");
    await controller.setFavoriteTopic(...reqRes);

    expect(toggleFavoriteTopic.withArgs(reqRes[0].session.userID, reqRes[0].body.id).calledOnce).to.be.true;
    expect(reqRes[1].value).to.deep.equal({ error: false, message: "We updated succesfully the favorite status of this topic" });
  });
  describe("EXCEPTION", () => {
    it("should call NOT service toggleFavoriteTopic, cause there no user session", async () => {
      const toggleFavoriteTopic = sandbox.stub(services, "toggleFavoriteTopic");
      await controller.setFavoriteTopic(...reqResNOUser);
  
      expect(toggleFavoriteTopic.notCalled).to.be.true;
      expect(reqRes[1].value).to.deep.equal({ error: true, message: "There is no session for un/make this topic your favorite" });
    });
  });

  it("should call service createTopicDB", async () => {
    const createTopicDB = sandbox.stub(services, "createTopicDB");
    await controller.createTopic(...reqRes);

    expect(createTopicDB.withArgs(reqRes[0].session.userID, reqRes[0].body.subject, reqRes[0].body.intro).calledOnce).to.be.true;
    expect(reqRes[1].value).to.deep.equal({ error: false, message: "The topic has been created succesfully" });
  });
  describe("EXCEPTION", () => {
    it("should NOT call service createTopicDB, cause there no user session", async () => {
      const createTopicDB = sandbox.stub(services, "createTopicDB");
      await controller.createTopic(...reqResNOUser);
  
      expect(createTopicDB.notCalled).to.be.true;
      expect(reqRes[1].value).to.deep.equal({ error: true, message: "There is no session for creating a topic" });
    });
  });
  
  it("should call service deleteTopicDB", async () => {
    const deleteTopicDB = sandbox.stub(services, "deleteTopicDB");
    await controller.deleteTopic(...reqRes);

    expect(deleteTopicDB.withArgs(reqRes[0].session.userID, reqRes[0].body.id).calledOnce).to.be.true;
    expect(reqRes[1].value).to.deep.equal({ error: false, message: "The topic has been deleted succesfully" });
  });
  describe("EXCEPTION", () => {
    it("should NOT call service deleteTopicDB, cause there no user session", async () => {
      const deleteTopicDB = sandbox.stub(services, "deleteTopicDB");
      await controller.deleteTopic(...reqResNOUser);
  
      expect(deleteTopicDB.notCalled).to.be.true;
      expect(reqRes[1].value).to.deep.equal({ error: true, message: "There is no session for removing a topic" });
    });
  });

  it("should call service getTopicData and getMainComments and get the topic data and comments", async () => {
    const getTopicData = sandbox.stub(services, "getTopicData").withArgs(reqRes[0].params.id).returns([true]);
    const getMainComments = sandbox.stub(services, "getMainComments").withArgs(reqRes[0].params.id).returns(true);
    await controller.getTopic(...reqRes);

    expect(getTopicData.withArgs(reqRes[0].params.id).calledOnce).to.be.true;
    expect(getMainComments.withArgs(reqRes[0].params.id).calledOnce).to.be.true;
    expect(reqRes[1].value).to.deep.equal({ error: false, message: "The topic was found succesfully", topic: true, comments: true });
  });
});