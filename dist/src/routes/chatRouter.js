import { Router } from "express";
import { protect } from "../../middleware/AuthMiddleware.js";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../Controller/chatController.js";
const chatRouter = Router();
chatRouter.post("/new", protect, generateChatCompletion);
chatRouter.get("/all-chats", sendChatsToUser);
chatRouter.delete("/delete", deleteChats);
export default chatRouter;
//# sourceMappingURL=chatRouter.js.map