import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
export default app;
//# sourceMappingURL=app.js.map