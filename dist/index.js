import app from "./app.js";
import userRouter from "./routes/userRouter.js";
import chatRouter from "./routes/chatRouter.js";
import imgRouter from "./routes/imgRouter.js";
import connectdb from "./config/mongodb.js";
// const mongoUri = process.env.MONGODB_URI || 'default-mongodb-uri';
// try {
//   mongoose.connect(mongoUri);
//   console.log("MongoDB connected successfully")
// } catch (error) {
//   console.log(error);
// }
connectdb();
app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/", userRouter);
app.use("/", chatRouter);
app.use("/openai", imgRouter);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map
