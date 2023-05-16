import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { createToken } from "../utils/jwt.js";
import CustomError from "../models/CustomError.js";

const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return next(
        new CustomError("User with provided email already exists", 403)
      );
    }

    // Since username should also be unique
    user = await User.findOne({ username });

    if (user) {
      return next(
        new CustomError("User with provided username already exists", 403)
      );
    }

    user = new User({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;

    await user.save();

    res.status(201).json({ success: true, user });
  } catch (err) {
    console.log(err);
    next(new CustomError("Something went wrong", 500));
  }
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) return next(new CustomError("Invalid credentials", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new CustomError(`Invalid credentials`, 400));
    }

    const accessToken = createToken({
      id: user._id,
    });
    user.isLoggedIn = true;
    await user.save();
    res
      .header("authorization", accessToken)
      .send({ success: true, accessToken, user });
  } catch (err) {
    console.log(err);
    next(new CustomError("Something went wrong", 500));
  }
};

export default { signUp, login };
