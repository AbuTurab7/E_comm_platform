import { Router } from "express";
import {
  getMeController,
  postRefreshController,
  postLoginController,
  postLogoutController,
  postRegisterController,
} from "../controllers/auth.controller.js";
import {
  loginValidation,
  registerValidation,
} from "../validations/auth.validation.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerValidation, postRegisterController);
authRouter.post("/login", loginValidation, postLoginController);
authRouter.get("/me", authenticate, getMeController);
authRouter.post("/refresh-token", postRefreshController);
authRouter.post("/logout", authenticate, postLogoutController);

export default authRouter;
