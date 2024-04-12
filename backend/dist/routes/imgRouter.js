import { Router } from "express";
import { imgController } from "../Controller/imgController.js";
const imgRouter = Router();
imgRouter.post("/generateimage", imgController);
export default imgRouter;
//# sourceMappingURL=imgRouter.js.map