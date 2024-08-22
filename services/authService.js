import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import secret from "../config/auth.config.js";

const signup = async (userData) => {
  const savedUser = await User.findOne({ email: userData.email });
  if (savedUser) {
    throw new Error("USER_EXISTED");
  }

  const user = new User({
    name: userData.name,
    email: userData.email,
    password: bcrypt.hashSync(userData.password, 8),
  });

  await user.save();
  const token = jwt.sign({ id: user.id }, secret, {
    expiresIn: "24h", // 24 hours
  });

  return {
    message: "USER_CREATED",
    id: user._id,
    name: user.name,
    email: user.email,
    accessToken: token,
  };
};

const signin = async (loginData) => {
  const user = await User.findOne({ email: loginData.email });
  if (!user) {
    throw new Error("INVALID_EMAIL");
  }

  const passwordIsValid = bcrypt.compareSync(loginData.password, user.password);

  if (!passwordIsValid) {
    throw new Error("INVALID_PASSWORD");
  }

  const token = jwt.sign({ id: user.id }, secret, {
    expiresIn: "24h", // 24 hours
  });

  return {
    message: "LOGIN_SUCCESS",
    id: user._id,
    name: user.name,
    email: user.email,
    accessToken: token,
  };
};

export default {
  signup,
  signin,
};
