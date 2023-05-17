import express from "express";
import { check } from "express-validator";
import auth from "../middlewares/auth.js";
import {
  findAll,
  createProduct,
  findOne,
  update,
  deleteProduct,
} from "../controllers/product.js";

const router = express.Router();

router.get("/", findAll);

router.post(
  "/new",
  auth,
  [
    check("title", "Please fill out the field").trim().notEmpty(),
    check("body", "Please fill out the field").trim().notEmpty(),
  ],
  createProduct
);

router.get("/:id", findOne);

router.post(
  "/edit/:id",
  auth,
  [
    check("title", "Please fill out the field").trim().notEmpty(),
    check("body", "Please fill out the field").trim().notEmpty(),
  ],

  update
);

router.post("/delete/:id", auth, deleteProduct);

export default router;
