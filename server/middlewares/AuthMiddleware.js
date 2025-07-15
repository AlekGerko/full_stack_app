const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    return res.json({ error: "log in first" });
  }

  try {
    const validToken = verify(accessToken, "personalSecretToken");
    req.user = validToken; //creates a verable 'user' which i can use whenever im using 'validateToken'

    if (validToken) {
      // console.log("validtoken", validToken);
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
