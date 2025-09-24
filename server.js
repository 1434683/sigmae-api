import express from "express";
const app = express();
const PORT = process.env.PORT || 8080;

app.get("/health", (_req, res) => res.send("OK"));
app.get("/", (_req, res) => res.send("SIGMA-E rodando no Cloud Run 🚀"));

app.listen(PORT, () => console.log("API on port", PORT));
