// import "express-async-errors";

import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { comparePassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";

// import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  // res.send("register");
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  // if (!user) throw new res.send("login");
  // if (!user) throw new UnauthenticatedError("invalid credentials");
  // const isPasswordCorrect = await comparePassword(
  //   req.body.password,
  //   user.password
  // );
  // if (!isPasswordCorrect) throw new UnauthenticatedError("invalid credentials");
  // res.send("login route");

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  const token = createJWT({ userId: user._id, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;

  // res.send("login");
  // res.json({ token });
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "user logged in" });
};

// export const getAllUsers = async (req, res) => {
//   const users = await User.find({});
//   res.status(StatusCodes.OK).json({ users });
// };

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
