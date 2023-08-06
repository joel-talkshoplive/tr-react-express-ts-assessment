import express from "express";
import todoRouter from "./todos";

const app = express();
const port = 3000;
const API_KEY = "my-secret-api-key";

app.get("/health-check", (req, res) => {
  res.json({ status: "up" });
});

export const viteNodeApp = app;
