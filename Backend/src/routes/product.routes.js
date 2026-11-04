import { Router } from "express";
import {
  getSingleProductValidation,
  productValidation,
} from "../validations/products.validation.js";
import {
  deleteProductController,
  getAllProductsController,
  getSingleProductController,
  postCreateProductController,
  putProductController,
} from "../controllers/product.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const productRouter = Router();

productRouter.post(
  "/",
  authenticate,
  productValidation,
  postCreateProductController,
);
productRouter.get("/", getAllProductsController);
productRouter.get(
  "/:id",
  getSingleProductValidation,
  getSingleProductController,
);
productRouter.put(
  "/:id",
  authenticate,
  productValidation,
  putProductController,
);
productRouter.delete("/:id", authenticate, deleteProductController);

export default productRouter;
