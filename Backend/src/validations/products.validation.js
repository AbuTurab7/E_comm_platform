import { body, param, validationResult } from "express-validator";

export const productValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Title must contain atleast 2 characters."),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required.")
    .bail()
    .isLength({ min: 20 })
    .withMessage("Description must contain atleast 20 characters."),
  body("price")
    .trim()
    .notEmpty()
    .withMessage("Price is required.")
    .bail()
    .matches(/^[0-9]+(\.[0-9]+)?$/)
    .withMessage("Price must only contain digits and a decimal point.")
    .toFloat(),
  body("quantity")
    .trim()
    .notEmpty()
    .withMessage("Quantity is required.")
    .bail()
    .matches(/^[0-9]+$/)
    .withMessage("Quantity must only contain whole numbers.")
    .toInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid request.",
        errors: errors.array(),
      });
    }
    next();
  },
];

export const getSingleProductValidation = [
  
  param("id").isMongoId().withMessage("Invalid Id."),
  (req , res , next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.status(400).json({
        message: "Invalid request.",
        errors: errors.array(),
      })
    }
    next();
  }
]
