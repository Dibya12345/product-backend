import express from "express";
import connectToDatabase from "./database/index.js";
import user from "./routes/user.js";
import product from "./routes/product.js";
import errorMiddleware from "./middlewares/error.js";

const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(400).send("Welcome to the openfibre challenge");
});

app.use("/user", user);
app.use("/product", product);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    errors: [
      {
        msg: "Route not found",
      },
    ],
  });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

connectToDatabase().then((_) => {
  app.listen(PORT, (_) => {
    console.log(`Server started on port ${PORT}`);
  });
});
