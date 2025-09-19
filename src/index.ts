import express from "express";
import { tradeRouter } from "./routes/trade-route.js";

import { PORT } from "./config/config.js";

const port = PORT;
const app = express();
app.use(express.json());

app.use("/api/v1/trades", tradeRouter);

app.listen(port, () => {
  console.log(`Server Listning on port ${port}`);
});
