var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from '../Model/userModel.js';
import { compare } from "bcrypt";
import isValidEmail from 'is-valid-email';
import generateToken from "../utils/generateToken.js";
export const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.find();
        return res.status(200).json({ message: "Ok", user });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
});
export const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const userExist = yield User.findOne({ email });
    if (userExist) {
        res.status(400);
        res.status(500).json({ message: "User Already Exists" });
        return;
    }
    //  if the user doesnot exists we create a new user, set its cookie to login
    //  and add it into the database
    if (name && email && isValidEmail(email)) {
        const user = yield User.create({
            name,
            email,
            password,
        });
        if (user) {
            // Here creating the cookie before sending the res
            const userIdString = user._id.toString();
            generateToken(res, userIdString);
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        }
        else {
            res.status(400);
            return res.status(500).json({ message: "Wrong User Credentials" });
        }
    }
    else {
        return res.status(400).json({ message: "Invalid Email" });
    }
});
export const authUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send("Login");
    const { email, password } = req.body;
    const user = yield User.findOne({ email: email });
    if (user && (yield compare(password, user.password))) {
        const userIdString = user._id.toString();
        generateToken(res, userIdString);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            // password : user.password,
        });
    }
    else {
        return res.status(500).json({ message: "Incorrect Email or password" });
    }
});
export const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.send("Logged out successfully");
});
//# sourceMappingURL=userController.js.map