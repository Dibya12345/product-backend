import Product from "../models/product.js";
import User from "../models/userModel.js";
import CustomError from "../models/CustomError.js";

const createProduct = async (req, res, next) => {
  if (!req.body) {
    return next(new CustomError("Body cannot be empty", 400));
  }
  try {
    const product = await Product.create({
      title: req.body.title,
      body: req.body.body,
      creator: req.uid,
    });

    //connected products with the user
    const user = await User.findById(req.uid);

    if (user) {
      const products = [...user.products, Product.id];
      await user.updateOne({ products });

      return res.status(201).send({ success: true, Product });
    }
  } catch (err) {
    console.log(err);
    next(new CustomError("Something went wrong", 500));
  }
};

const findAll = async (req, res, next) => {
  try {
    const tut = await Product.find();

    return res.status(200).send({ success: true, Product: tut });
  } catch (err) {
    console.log(err);
    next(new CustomError("Something went wrong", 500));
  }
};



const findOne = async (req, res, next) => {
  try {
    const tut = await Product.findById(req.params.id);

    if (!tut) {
      return next(new CustomError("Product not found", 404));
    }
    res.send({ success: true, Product: tut });
  } catch (err) {
    next(new CustomError("Something went wrong", 500));
  }
};

const update = async (req, res, next) => {
  try {
    const editProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!editProduct) {
      return next(new CustomError("Product not found", 404));
    }

    return res.status(200).send({ success: true, Product: editProduct });
  } catch (err) {
    next(new CustomError("Something went wrong", 500));
  }
};

const delete = async (req, res, next) => {
  try {
    const Product = await Product.findById(req.params.id);
    if (!Product) {
      return next(new CustomError("Product not found", 404));
    }

    if (Product.creator != req.uid) {
      return next(new CustomError("Unauthorized access to delete route", 400));
    }

    await Product.findByIdAndDelete(req.params.id);
    const user = await User.findById(req.uid);

    if (user) {
      let products = user.products.filter((tutId) => tutId != req.params.id);
      await user.updateOne({ products });
    }

    return res.send({ success: true, Product });
  } catch (err) {
    next(new CustomError("Something went wrong", 500));
  }
};

export default createProduct;
