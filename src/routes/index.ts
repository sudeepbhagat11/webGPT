import { Router } from "express";
import userRouter from "./userRouter.js";
import chatRouter from "./chatRouter.js";
import imgRouter from "./imgRouter.js";

const appRouter = Router();


appRouter.use("/user", userRouter);
appRouter.use("/chat", chatRouter);
appRouter.use("/openai",imgRouter);


export default appRouter;