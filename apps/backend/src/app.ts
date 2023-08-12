import express from "express";
import todoRouter from "./todos";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;
const API_KEY = "my-secret-api-key";

app.get("/health-check", (req, res) => {
  res.json({ status: "up" });
});

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  if(req.headers["api-key"] === API_KEY) {
    next();
  } else {
    res.status(401);
    res.send();
  }
});
app.use("/", todoRouter);

export const viteNodeApp = app;
