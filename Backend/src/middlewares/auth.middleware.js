import { config } from "../config/config.js";
import { UserModel } from "../models/auth.model.js";
import { verifyToken } from "../utils.js/auth.utils.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("authHeader", authHeader);

    if (!authHeader) {
      return res
        .status(401)
        .json({
          message: "Unauthorized! Token not found. Please login again.",
        });
    }

    const accessToken = authHeader.split(" ")[1];

    console.log("accessToken", accessToken);

    if (!accessToken || accessToken === "null") {
      return res.status(401).json({
        message: "Unauthorized! Token not found. Please login again.",
      });
    }

    const decoded = verifyToken(accessToken, config.ACCESS_SECRET);

    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        message: "User not found. Please login again",
      });
    }

    req.user = { userId: user._id };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Access token expired. Please login again." });
    }
    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ message: "Invalid access token. Please login again." });
    }
    next(error);
  }
};
