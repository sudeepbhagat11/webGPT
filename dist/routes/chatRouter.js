import { Router } from "express";
// import { protect } from "../../middleware/AuthMiddleware.js";
import { deleteChats, generateChatCompletion, sendChatsToUser, } from "../Controller/chatController.js";
import { verifyToken } from "../utils/generateToken.js";
const chatRouter = Router();
chatRouter.post("/new", verifyToken, generateChatCompletion);
chatRouter.get("/all-chats", verifyToken, sendChatsToUser);
chatRouter.delete("/delete", verifyToken, deleteChats);
export default chatRouter;
//# sourceMappingURL=chatRouter.js.map