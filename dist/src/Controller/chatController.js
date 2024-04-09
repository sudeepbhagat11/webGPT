var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../Model/userModel";
import { configureOpenAI } from "../config/openai_config";
import OpenAI from "openai";
const openai = new OpenAI();
export const generateChatCompletion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message } = req.body;
        const user = yield User.findById(res.locals.jwtData.id);
        if (!user) {
            return res
                .status(401)
                .json({ message: "User not registered or token malfunctioned" });
        }
        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        chats.push({ content: message, role: "user" });
        // const config = configureOpenAI();
        const config = configureOpenAI();
        // const openai = new OpenAI(config);
        const openai = new OpenAI(config);
        const chatResponse = yield openai.chat.completions.create({
            messages: chats,
            model: "gpt-3.5-turbo",
        });
        user.chats.push(chatResponse.data.choices[0].message);
        yield user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went error" });
    }
});
export const sendChatsToUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //user token check
        const user = yield User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
});
export const deleteChats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //user token check
        const user = yield User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        //@ts-ignore
        user.chats = [];
        yield user.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
});
//# sourceMappingURL=chatController.js.map