import config from "config";
import jwt from "jsonwebtoken";

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

export default auth;
