const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const controller = require("../../apis/components/profile/controller");
const { Users } = require("../../apis/config/sequelize_database");
const mockDBHelper = require("./helpers/mockDB_helper");
const reqRes = require("./helpers/reqRes");

describe("Profile (controller)", () => {

  const { req, res } = reqRes({ reqBody: "Bye" });

  const userData = {
    id: 1,
    username: 'Newby',
    profile_image: null,
    profile_info: 'Hello',
    favorite_topics: '[2,3,4]',
    friends: "[]",
    register_date: null,
    votes_topics: "[]"
  };

  before((done) => {
    Users.update({ profile_info: "Hello" }, { where: { id: 1 } })
    .then(() => done())
    .catch(err => { if(err) console.log( "Error in profile BEFORE EACH with DB... " )})
  });

  afterEach((done) => {
    Users.update({ profile_info: "Hello" }, { where: { id: 1 } })
    .then(() => done())
    .catch(err => { if(err) console.log( "Error in profile BEFORE EACH with DB... " )})
  });

  describe("Edit user profile info", () => {
    it("from: 'Hello'. To: 'Bye'. on DB", async () => {
      await controller.updateUserInfo(req, res);
      const [{ profile_info }] = await mockDBHelper.getProfileInfo();
      expect(profile_info).to.be.equal("Bye");
    });
  });

  describe("Receive user data", () => {
    it("should response with user #1 data", async () => {
      await controller.askForUserData(req, res);
      expect(res.body).to.be.a("string");
      expect(JSON.parse(res.body)).to.deep.equal({error:false, message: "We found the user profile with the id you asked", data: userData });
    });
    it("shouldnt response with data because there no user logged", async () => {
      req.session.userID = null;
      await controller.askForUserData(req, res);
      expect(JSON.parse(res.body)).to.deep.include({ error: true, message: "There's no id for getting user profile" });
    });
  });
});