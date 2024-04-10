import { Router } from "express";
import { verifyToken } from "../utils/generateToken.js";
import { authUser, getAllUsers, signUp, logoutUser, verifyUser } from "../Controller/userController.js";
const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.post("/signup", signUp);
userRouter.post("/login", authUser);
userRouter.get("/auth-status", verifyToken, verifyUser);
userRouter.post("/logout", logoutUser);
export default userRouter;
//# sourceMappingURL=userRouter.js.map