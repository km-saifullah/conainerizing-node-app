import express from "express";
import userRouter from "./routes/userRoutes.js";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

// routes
app.use("/api/v1/users/", userRouter);

export default app;