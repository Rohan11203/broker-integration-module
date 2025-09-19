import { Router } from "express";
import { syncTradesController } from "../controllers/trade-controller.js";

export const tradeRouter = Router();

tradeRouter.post("/sync", syncTradesController);
