import express, { Express } from "express";
import { errorHandler } from "./middlewares/errorHandler";
const app: Express = express();

app.use(express.json());
app.get("/", (req, res) => {
    res.status(200).json("It is up and running...");
});
app.use(express.urlencoded({ extended: true }));

import { ItemRouter } from "./routes/Item.route";
app.use("/api/v1/item", ItemRouter);

app.use(errorHandler);

export default app;
