import app from './app.js';
import userRouter from "./routes/userRouter.js";
import chatRouter from "./routes/chatRouter.js";
import connectdb from "./config/mongodb.js";
// const mongoUri = process.env.MONGODB_URI || 'default-mongodb-uri';
// try {
//   mongoose.connect(mongoUri);
//   console.log("MongoDB connected successfully")
// } catch (error) {
//   console.log(error);
// }
connectdb();
app.get("/api", (req, res) => {
    res.send("Hello");
});
app.use("/api", userRouter);
app.use("/api", chatRouter);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map