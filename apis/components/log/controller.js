const services = require("./services");

const controller = {
  loginUser: async (req, res) => {
    const id = req.session?.userID;
    if (id) {
      res.send({ message: "You are already logged in" })
      return;
    }

    const userData = req.body;

    if (userData.username.length < 5) {
      res.send(JSON.stringify({ problem: "username", message: "The username doesnt exist" }));
      return;
    }
    try {
      const listOfResult = await services.isUsernameAlreadyOnDB(userData);
      const usernameExist = !!(listOfResult.length);
      
      if (!usernameExist) {
        res.send(JSON.stringify({ problem: "username", message: "The username doesnt exist" }));
        return;
      }


    } catch (err) {
      if (err) {
        console.log("Error with the username")
        res.send(JSON.stringify({ problem: "username", message: "The username doesnt exist" }));
      }
    }

    try {
      console.log(userData)
      const userDataRaw = await services.isUsernamePasswordMatching(userData);
      if (!userDataRaw) {
        res.send(JSON.stringify({ problem: "password", message: "The password is wrong" }));
        return;
      }

      const userDataSecure = { ...userDataRaw, password: "que miras gato de mierda, esto fue escrito por el team de seguridad" };
      req.session.userID = userDataSecure.id;
      console.log(userData.id)
      res.send(JSON.stringify({ problem: false, message: "The user logged in succesfully", userdata: userDataSecure }));

    } catch (err) {
      if (err) {
        res.send(JSON.stringify({ problem: "password", message: "The password is wrong" }));
        console.log("Problem matching the password")
      }
    }
  },
  logoutUser: (req, res) => {
    const id = req.session?.userID;
    if (!id) {
      res.send({ message: "There is no session for log out" })
    }

    req.session.destroy();
    res.clearCookie("connect.sid");
    res.send("You logged out")
  },
  registerUser: async (req, res) => {
    let userData = req.body;
    if (userData.username.length < 5) {
      res.send(JSON.stringify({ problem: "username", message: "The username is too short (min: 5 characters)" }));
      return;
    }
    
    const isUserRegistered = await services.isUsernameAlreadyOnDB(userData);

    if (!!(isUserRegistered.length)) {
      res.send(JSON.stringify({ problem: "username", message: "The username already exists" }));
      return;
    }
    if (userData.password.length < 5) {
      res.send(JSON.stringify({ problem: "password", message: "The password is too short (min: 5 characters)" }));
      return;
    }
    try {
      const register_date = new Date().toISOString().slice(0, 10);
      const result = await services.registerUserOnDB({ ...userData, register_date });
      res.send(result);
    }
    catch (err) {
      res.send(err);
      console.log(err);
    }
  }
}

module.exports = controller;