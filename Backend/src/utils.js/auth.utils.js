import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
import crypto from "crypto"

export const generateTokens = ({ userId }) => {
  const accessToken = jwt.sign({ userId }, config.ACCESS_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, config.REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

export const hashToken = (token) => {
 return crypto.createHash("sha256").update(token).digest("hex");
}

export const verifyToken = (token, secret) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};
