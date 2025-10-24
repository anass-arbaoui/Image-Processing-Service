import { Router } from "express";
import { controller } from "./controller";

export const sharpRouter = Router();

sharpRouter.get("/images", controller.getAll);
sharpRouter.get("/images/:id/", controller.getById);
sharpRouter.post("/images/:id/", controller.getTransformed);
