import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import { apiLimiter } from "./middleware/rateLimit.middleware";

import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();


app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(apiLimiter);

app.use("/api", userRoutes);

export default app;
