import express from "express";
import { check } from "express-validator";
import auth from "../middlewares/auth.js";
import productController from "../controllers/product.js";

const router = express.Router();

router.get("/", productController.findAll);

router.post(
  "/new",
  auth,
  [
    check("title", "Please fill out the field").trim().notEmpty(),
    check("body", "Please fill out the field").trim().notEmpty(),
  ],

  productController.createProduct
);

router.get("/:id", productController.findOne);

router.post(
  "/edit/:id",
  auth,
  [
    check("title", "Please fill out the field").trim().notEmpty(),
    check("body", "Please fill out the field").trim().notEmpty(),
  ],

  productController.update
);

router.post("/delete/:id", auth, productController.delete);

export default router;
