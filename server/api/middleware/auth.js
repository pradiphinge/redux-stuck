import jwt from "jsonwebtoken";
import config from "config";

const authenticateUser = (req, res, next) => {
  //Retrieve Header token
  const token = req.header("x-auth-token");

  //check token
  if (!token) {
    return res.status(401).json({
      msg: "No token,authorisation denied",
    });
  }
  //verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      msg: "Invalid token, try login",
    });
  }
};

export default authenticateUser;
