import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "secretkey";

const createToken = (payload) => {
  return jwt.sign(payload, jwtSecret);
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};
export { createToken, verifyToken };
