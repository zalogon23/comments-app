const { Comments } = require("../../apis/config/sequelize_database");
const expect = require("chai").expect;
const sinon = require("sinon");
const controller = require("../../apis/components/comments/controller");
const services = require("../../apis/components/comments/services");

describe("COMMENTS Controller", () => {
  const sandbox = sinon.createSandbox();
  const reqRes = [{
    body: { id: 99, content: "Algo", topic: 2 }, //Comment mock info
    session: { userID: 79 }, // User Mock info
    params: { parent: 2 } //Mock comment query id
  }, {
    json: value => { reqRes[1].value = value },
    value: null
  }];
  const reqResNOChildren = [{ session: { userID: 79 }, params: { parent: 1 } }, { json: value => { reqRes[1].value = value }, value: null }];
  const reqResNOUser = [{ session: {}, params: { parent: 1 } }, { json: value => { reqRes[1].value = value }, value: null }];
  const comments = [{
    id: 4,
    content: 'Algo',
    parent: 2,
    children: '[]',
    author: 41,
    topic: 1,
    image: null
  }];
  const parent = 2;

  afterEach(() => {
    sandbox.restore();
  });

  describe("get children comments", () => {
    it("should call service getChildCommentsOf and get an array of comments", async () => {
      const getChildCommentsOf = sandbox.stub(services, "getChildCommentsOf").withArgs(parent).returns(comments);
      await controller.getTopicSubComments(...reqRes);

      expect(getChildCommentsOf.withArgs(parent).calledOnce).to.be.true;
      expect(reqRes[1].value).to.be.deep.equal(comments);
    })

    describe("EXCEPTION", () => {
      it("should call service getChildCommentsOf and get an empty array (cause the comment id passed has no children)", async () => {
        const getChildCommentsOf = sandbox.stub(services, "getChildCommentsOf").withArgs(1).returns([]);
        await controller.getTopicSubComments(...reqResNOChildren);

        expect(getChildCommentsOf.withArgs(1).calledOnce).to.be.true;
        expect(reqRes[1].value).to.be.deep.equal({ error: true, message: "The comment hasnt child or doesnt exist" });
      })
    })
  })

  describe("add new comment", () => {
    it("should call service addCommentDB", async () => {
      const addCommentDB = sandbox.stub(services, "addCommentDB");
      await controller.addComment(...reqRes);

      expect(addCommentDB.withArgs(reqRes[0].body, reqRes[0].session.userID).calledOnce).to.be.true;
      expect(reqRes[1].value).to.be.deep.equal({ error: false, message: "The comment has been added succesfully" });
    });
    describe("EXCEPTION", () => {
      it("should NOT call service addCommentDB (cause there no user session)", async () => {
        const addCommentDB = sandbox.stub(services, "addCommentDB");
        await controller.addComment(...reqResNOUser);

        expect(addCommentDB.notCalled).to.be.true;
        expect(reqRes[1].value).to.be.deep.equal({ error: true, message: "There is no session for making a comment" });
      });
    })
  });

  describe("edit comment", () => {
    it("should call service updateCommentDB", async () => {
      const updateCommentDB = sandbox.stub(services, "updateCommentDB");
      await controller.editComment(...reqRes);

      expect(updateCommentDB.withArgs(reqRes[0].body, reqRes[0].session.userID).calledOnce).to.be.true;
      expect(reqRes[1].value).to.be.deep.equal({ error: false, message: "The comment has been updated succesfully" });
    });
    describe("EXCEPTION", () => {
      it("should NOT call service updateCommentDB (cause there no user session)", async () => {
        const updateCommentDB = sandbox.stub(services, "updateCommentDB");
        await controller.editComment(...reqResNOUser);

        expect(updateCommentDB.notCalled).to.be.true;
        expect(reqRes[1].value).to.be.deep.equal({ error: true, message: "There is no session for updating the comment" });
      });
    })
  });

  describe("delete comment", () => {
    it("should call service removeCommentDB", async () => {
      const removeCommentDB = sandbox.stub(services, "removeCommentDB");
      await controller.deleteComment(...reqRes);

      expect(removeCommentDB.withArgs(reqRes[0].body.id, reqRes[0].session.userID).calledOnce).to.be.true;
      expect(reqRes[1].value).to.be.deep.equal({ error: false, message: "The comment has been removed succesfully" });
    });
    describe("EXCEPTION", () => {
      it("should NOT call service updateCommentDB (cause there no user session)", async () => {
        const removeCommentDB = sandbox.stub(services, "removeCommentDB");
        await controller.deleteComment(...reqResNOUser);
  
        expect(removeCommentDB.notCalled).to.be.true;
        expect(reqRes[1].value).to.be.deep.equal({ error: true, message: "There is no session for deleting the comment" });
      });
    })
  });
});