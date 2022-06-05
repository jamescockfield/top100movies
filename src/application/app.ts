import express, { Request, Response } from "express";

import config from "./config/expressConfig";

const app = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world");
});

app.listen(config.EXPRESS_PORT, () => {
    console.log(`Listening on ${config.EXPRESS_PORT}`);
});
