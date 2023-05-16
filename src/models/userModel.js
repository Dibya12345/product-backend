import mongoose from "mongoose";

// FIXME: Don't store the loggedIn status and token of user in database (if you want restful api).

// TODO: Add user's fullName

// username is made unique (should be unique)

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  products: [],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const user = mongoose.model("User", userSchema);

export default user;
