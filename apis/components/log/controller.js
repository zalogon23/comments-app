const services = require("./services");

const controller = {
  loginUser: async (req, res) => {
    const id = req.session?.userID;
    if (id) {
      res.json({ error: true, message: "You are already logged in" });
      return;
    }

    const userData = req.body;

    if (userData.username.length < 5) {
      res.json({ error: true, cause: "username", message: "The username doesnt exist" });
      return;
    }
    try {
      const userDB = await services.isUsernameAlreadyOnDB(userData.username);
      const usernameExist = !!userDB;

      if (!usernameExist) {
        res.json({ error: true, cause: "username", message: "The username doesnt exist" });
        return;
      }

    } catch (err) {
      if (err) {
        console.log(err)
        res.json({ error: true, cause: "username", message: "The username doesnt exist" });
        return;
      }
    }

    try {
      const userDataRaw = await services.isUsernamePasswordMatching(userData);

      if (!userDataRaw) {
        res.json({ error: true, cause: "password", message: "The password is wrong" });
        return;
      }
      const userDataSecure = { ...userDataRaw, password: "que miras gato de mierda, esto fue escrito por el team de seguridad" };
      req.session.userID = userDataSecure.id;
      res.json({ error: false, message: "The user logged in succesfully", data: userDataSecure });
      return;

    } catch (err) {
      if (err) {
        res.json({ error: true, cause: "password", message: "The password is wrong" });
        console.log(err);
      }
    }
  },
  logoutUser: (req, res) => {
    const id = req.session?.userID;
    if (!id) {
      res.json({ error: true, message: "There is no session for log out" })
      return;
    }

    req.session.destroy();
    res.clearCookie("connect.sid");
    res.json({ error: false, message: "You logged out succesfully" });
  },
  registerUser: async (req, res) => {
    let userData = req.body;
    if (userData.username.length < 5) {
      res.json({ error: true, cause: "username", message: "The username is too short (min: 5 characters)" });
      return;
    }

    try{
      const userDB = await services.isUsernameAlreadyOnDB(userData.username);

      if (!!userDB) {
        res.json({ error: true, cause: "username", message: "The username already exists" });
        return;
      }
      if (userData.password.length < 5) {
        res.json({ error: true, cause: "password", message: "The password is too short (min: 5 characters)" });
        return;
      }
    }catch(err){
      console.log(err);     
      res.json({ error: true, cause: "database", message: "There was an error looking for the username on DB" });
      return;
    }
    try {
      const register_date = new Date().toISOString().slice(0, 10);
      await services.registerUserOnDB({ ...userData, register_date });
      res.json({ error: false, message: "The user has been registered succesfully" });
      return;
    }
    catch (err) {
      if (err) {
        console.log(err);
        res.json({ error: true, message: "There was an error registreing the user" });
      }
    }
  }
}

module.exports = controller;