import { verify } from "jsonwebtoken";


const verifyToken = (token) => {
  try {
    const isValidToken = verify(token, process.env.privateKey);
    return isValidToken;
  } catch (err) {
    return false
  }
};

export { verifyToken };