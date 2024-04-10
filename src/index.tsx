import express from "express";
import mongoose from "mongoose";
import app from "./app.js";
import userRouter from "./routes/userRouter.js";
import chatRouter from "./routes/chatRouter.js";
import imgRouter from "./routes/imgRouter.js";
import path from "path";

import connectdb from "./config/mongodb.js";

connectdb();

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/api", (req, res) => {
    res.send("API is running....");
  });
}

app.use("/api", userRouter);
app.use("/api", chatRouter);
app.use("/openai", imgRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
