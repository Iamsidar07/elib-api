import express from "express";

import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";

const app = express();
app.use(express.json());

// routing
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

// global error handler at bottom
app.use(globalErrorHandler);
export default app;
