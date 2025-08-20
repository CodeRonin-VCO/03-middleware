import { Router } from "express";
import appController from "../controller/app.controller.js";


const appRouter = Router();
appRouter
    .get("/", appController.searchQuery)
    .get("/danger", appController.danger)

export default appRouter;