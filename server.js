import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

// healthcheck
app.get("/saude", (req, res) => res.send("ok"));

// LISTAR policiais
app.get("/policiais", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM policiais ORDER BY id DESC");
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ erro: "Falha ao listar" });
  }
});

// CRIAR policial
app.post("/policiais", async (req, res) => {
  try {
    const { nome, re, patente, status, acesso } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO policiais (nome, re, patente, status, acesso)
       VALUES ($1, $2, $3, COALESCE($4,'ATIVO'), COALESCE($5,'Não Concedido'))
       RETURNING *`,
      [nome, re, patente || null, status || null, acesso || null]
    );
    res.status(201).json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ erro: "Falha ao criar" });
  }
});

// porta para o Cloud Run
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("API no ar na porta", PORT));
