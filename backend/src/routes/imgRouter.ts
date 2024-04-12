import React from "react";

import { Router } from "express";
import { imgController } from "../Controller/imgController.js";

const imgRouter = Router();

imgRouter.post("/generateimage", imgController);

export default imgRouter;
