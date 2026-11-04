import { body, validationResult } from "express-validator";

export const registerValidation = [
  body("name")
    .trim()
    .exists()
    .withMessage("Name is required")
    .isAlpha("en-US" , {ignore: " "})
    .withMessage("Name can only contain letters and spaces.")
    .isLength({ min: 2 })
    .withMessage("Name must contain atleast 2 characters"),
  body("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email."),
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must contain atleast 6 characters.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number.")
    .matches(/[!@#$%^&*()/\//|<>]/)
    .withMessage("Password must contain at least one special character."),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password is required.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm password does not match.");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid request",
        errors: errors.array(),
      });
    }
    next();
  },
];

export const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email."),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid requests.",
        errors: errors.array(),
      });
    }
    next();
  },
];
