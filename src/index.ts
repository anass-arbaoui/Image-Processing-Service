import express from "express";
import dotenv from "dotenv";
import { sharpRouter } from "./sharp/sharp-router";
import { controller } from "./sharp/controller";
import { authRouter } from "./auth/router";
import { authMiddleware } from "./middlewares/authMiddleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/auth", authRouter);
app.use(authMiddleware);

app.use("/sharp", sharpRouter);

console.log(controller.getAll);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
