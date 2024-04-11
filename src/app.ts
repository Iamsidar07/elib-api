import express from "express";

import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";

const app = express();
app.use(express.json());

// routing
app.use("/api/users", userRouter);

// global error handler at bottom
app.use(globalErrorHandler);
export default app;
