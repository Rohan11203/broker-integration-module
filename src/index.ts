import express from "express";
import { tradeRouter } from "./routes/trade-route.js";
import dotenv from "dotenv"
import { PORT } from "./config/config.js";
dotenv.config()

const port = PORT
const app = express();
app.use(express.json())

app.use("/api/v1/trades", tradeRouter)

app.listen(port, () => {
  console.log(`Server Listning on port ${port}`);
});
