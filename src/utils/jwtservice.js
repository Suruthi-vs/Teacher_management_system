const jwt = require("jsonwebtoken");

exports.createToken = payload => {
  return jwt.sign(payload, process.env.JWT_key, {
    expiresIn: "1 hour"
  });
};

exports.validateToken = token => {
  try {
    const data = jwt.verify(token, process.env.JWT_key);
    return data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

// const token = createToken({ hello: "world!" });

// console.log(validateToken(token));
