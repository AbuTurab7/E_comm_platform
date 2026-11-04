import bcrypt from "bcrypt";
import { UserModel } from "../models/auth.model.js";
import {
  generateTokens,
  verifyToken,
  hashToken,
} from "../utils.js/auth.utils.js";
import { config } from "../config/config.js";

const isProduction = process.env.NODE_ENV === "production";

const refreshCookieOptions = {
  httpOnly: true,
  sameSite: isProduction ? "none" : "lax",
  secure: isProduction,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const postRegisterController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Already have an account. Please login.",
      });
    }

    const user = await UserModel.create({
      name,
      email,
      hashPassword: await bcrypt.hash(password, 10),
    });

    return res.status(201).json({
      message: "User registered successfully.",
      data: {
        user: {
          userId: user._id,
          name,
          email,
        },
      },
    });
  } catch (error) {
    console.error("Error in registration", error);
    next(error);
  }
};

export const postLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Account not found. Please register.",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.hashPassword);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password. Try again.",
      });
    }

    const { accessToken, refreshToken } = generateTokens({ userId: user._id });

    user.hashRefreshToken = hashToken(refreshToken);
    await user.save();

    res.cookie("refreshToken", refreshToken, refreshCookieOptions);

    return res.status(200).json({
      message: "User logged in successfully.",
      data: {
        user: {
          userId: user._id,
          name: user.name,
          email,
        },
        accessToken,
      },
    });
  } catch (error) {
    console.error("Error in logging user", error);
    next(error);
  }
};

export const getMeController = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.userId);
    if (!user) {
      return res.status(401).json({
        message: "User not found. Please login.",
      });
    }
    return res.status(200).json({
      message: "User fetched successfully.",
      data: {
        user: {
          userId: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const postRefreshController = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(404).json({
        message: "Refresh token not found. Please login again.",
      });
    }

    const decoded = verifyToken(refreshToken, config.REFRESH_SECRET);

    const user = await UserModel.findById(decoded.userId);

    if (!user || user.hashRefreshToken !== hashToken(refreshToken)) {
      return res.status(401).json({
        message: "Invalid refresh token. Please login again.",
      });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens({
      userId: user._id,
    });

    user.hashRefreshToken = hashToken(newRefreshToken);
    await user.save();

    res.cookie("refreshToken", newRefreshToken, refreshCookieOptions);

    // res.cookie("refreshToken", newRefreshToken, {
    //   httpOnly: true,
    //   sameSite: "lax",
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });

    return res.status(200).json({
      message: "Token refreshed successfully.",
      data: {
        user: {
          userId: user._id,
          name: user.name,
          email: user.email,
        },
        accessToken,
      },
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Refresh token expired. Please login again." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid refresh token." });
    }
    console.error("Error in authentication : ", error);
    next(error);
  }
};

export const postLogoutController = async (req, res, next) => { 
  try {
    const user = await UserModel.findById(req.user.userId);
    if (!user) {
      return res.status(401).json({
        message: "User not found.",
      });
    }
    user.hashRefreshToken = null;
    await user.save();

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    });

    // res.clearCookie("refreshToken", {
    //   httpOnly: true,
    //   sameSite: "lax",
    //   secure: process.env.NODE_ENV === "production",
    // });

    return res.status(200).json({
      message: "User logged out successfully.",
    });
  } catch (error) {
    next(error);
  }
};
