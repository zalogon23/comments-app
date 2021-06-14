const services = require("./services");

const controller = {
  askUser: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await services.getUserFromDB(id);
      res.json({ error: false, message: "We found the user profile with the id you asked", data: { ...result } });
      return;
    } catch (err) {
      console.log(err);
      if (err) res.json({ error: true, message: "We couldnt find the user with that id" })
    }
  },
  sendResetEmail: async (req, res) => {
    const { email } = req.body;
    if (!email) {
      res.json({ error: true, message: "There's no email" });
      return;
    }

    let userID = await services.emailOnDB(email).catch(err => {
      console.log(err);
      res.json({ error: true, message: "There was an error with the email" });
      return;
    });

    userID = userID?.id;

    if (!userID) {
      res.json({ error: true, message: "There's no such email" });
      return;
    }

    const now = Date.now();
    const resetKey = String(now) + userID;
    await services.setResetKey(resetKey, userID).catch(err => console.log(err));

    sendMail(email, `${process.env.DOMAIN}/reset/resetKey=${resetKey}&id=${userID}`)
      .then(() => {
        console.log("The fucking email was sent");
        res.json({ error: false, message: "The email has been sent..." })
      })
      .catch(err => console.log("There was an error man: " + err))
  },

  updatePassword: async (req, res) => {
    const { resetKey, id, password } = req.body;
    if (!resetKey || !id || !password) {
      res.json({ error: true, message: "There are missing parameters" });
      return;
    }

    if (password.length < 5) {
      res.json({ error: true, message: "There password is too short" });
      return;
    }

    const resetKeyValid = await services.matchResetKey(resetKey, id).catch(err => {
      console.log(err);
      res.json({ error: true, message: "There was an error with the retrieved data" });
      return;
    })

    console.log(resetKeyValid);

    if(!resetKeyValid){
      res.json({ error: true, message: "There was an error with the retrieved data" });
      return;
    }

    await services.setNewPassword( password, id ).catch(err => {
      console.log(err);
      res.json({ error: true, message: "There was an error setting the new password on DB"})
      return;
    });
    res.json({ error: false, message: "The password has been succesfully updated!" });
  }
}


function sendMail(to, url) {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_KEY);
  const message = {
    to,
    from: {
      email: "gonz230300@gmail.com",
      name: "EL mero cheroca"
    },
    subject: "Reset you password",
    html: `
    <p>Here is the url to reset your fucking password: </p>
    <a href="${url}">Reset Password</a>
    `
  };

  return sgMail.send(message)
}

module.exports = controller;