function reqRes({ reqBody, resBody = "" }) {
  const req = {
    session: {
      userID: 1
    },
    body: {
      info: reqBody
    }
  };
  const res = {
    send: (smth) => res.body = smth,
    json: (obj) => res.body = JSON.stringify(obj),
    body: resBody
  };

  return { req, res };
}


module.exports = reqRes;
