import { ProductModel } from "../models/products.model.js";

export const postCreateProductController = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "User not found. Please login.",
      });
    }

    const { title, description, quantity, price } = req.body;
    const isProductExist = await ProductModel.findOne({ title });

    if (isProductExist) {
      return res.status(409).json({
        message: "Product already exist.",
      });
    }

    const product = await ProductModel.create({
      title,
      description,
      quantity,
      price,
    });

    return res.status(201).json({
      message: "Product created successfully.",
      data: {
        product,
      },
    });
  } catch (error) {
    console.error("Error in creating product: ", error);
    next(error);
  }
};

export const getAllProductsController = async (req, res, next) => {
  try {
    const products = await ProductModel.find({});

    return res.status(200).json({
      message: "All players fetched successfully.",
      data: {
        products,
      },
    });
  } catch (error) {
    console.error("Error in getting all products: ", error);
    next(error);
  }
};

export const getSingleProductController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    return res.status(200).json({
      message: "Product fetched successfully.",
      data: {
        product,
      },
    });
  } catch (error) {
    console.error("Error in getting single product: ", error);
    next(error);
  }
};

export const putProductController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = req.body;

    const product = await ProductModel.findByIdAndUpdate(id, data);

    return res.status(200).json({
      message: "Product updated successfully.",
      data: {
        product,
      },
    });
  } catch (error) {
    console.error("Error in updating a product: ", error);
    next(error);
  }
};

export const deleteProductController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ProductModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("Error in deleting a product: ", error);
    next(error);
  }
};
