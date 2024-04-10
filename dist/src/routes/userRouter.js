import { Router } from "express";
import { authUser, getAllUsers, signUp, logoutUser } from "../Controller/userController.js";
const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.post("/signup", signUp);
userRouter.post("/login", authUser);
userRouter.post("/logout", logoutUser);
export default userRouter;
//# sourceMappingURL=userRouter.js.map