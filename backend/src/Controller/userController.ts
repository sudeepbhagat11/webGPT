import User from "../Model/userModel.js";
import { NextFunction, Request, Response } from "express";
import { compare } from "bcrypt";
import isValidEmail from "is-valid-email";
import { generateToken } from "../utils/generateToken.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.find();
    return res.status(200).json({ message: "Ok", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    res.status(500).json({ message: "User Already Exists" });
    return;
  }

  //  if the user doesnot exists we create a new user, set its cookie to login
  //  and add it into the database

  if (name && email && isValidEmail(email)) {
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      // Here creating the cookie before sending the res
      // const userIdString = user._id.toString();

      res.clearCookie("jwt", {
        httpOnly: false,
        // domain: "localhost",
        domain: "webgpt-69o3.onrender.com",
        signed: true,
        path: "/",
        secure: true,
      });

      const token = generateToken(user._id.toString(), user.email, "7d");
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      res.cookie("jwt", token, {
        path: "/",
        // domain: "localhost",
        domain: "webgpt-69o3.onrender.com",
        expires,
        httpOnly: false,
        signed: true,
        secure: true,
      });

      // generateToken(res,userIdString);

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      return res.status(500).json({ message: "Wrong User Credentials" });
    }
  } else {
    return res.status(400).json({ message: "Invalid Email" });
  }
};

export const authUser = async (req: Request, res: Response) => {
  // res.send("Login");

  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await compare(password, user.password))) {
    const userIdString = user._id.toString();

    res.clearCookie("jwt", {
      httpOnly: false,
      // domain: "localhost",
      domain: "webgpt-69o3.onrender.com",
      signed: true,
      path: "/",
      secure: true,
    });

    const token = generateToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie("jwt", token, {
      path: "/",
      // domain: "localhost"
      domain: "webgpt-69o3.onrender.com",
      expires,
      httpOnly: false,
      signed: true,
      secure: true,
    });

    // generateToken(res, userIdString)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    return res.status(500).json({ message: "Incorrect Email or password" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: false,
    expires: new Date(0),
  });
  res.send("Logged out successfully");
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
