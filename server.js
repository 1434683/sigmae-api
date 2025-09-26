import express from "express";

const app = express();
const PORT = process.env.PORT || 8080;

// Rota de saúde (testar se a API está no ar)
app.get("/saude", (req, res) => {
  res.send("SIGMA-E rodando no Cloud Run 🚀");
});

// Rota inicial simples
app.get("/", (req, res) => {
  res.send("API do SIGMA-E funcionando!");
});

app.listen(PORT, () => {
  console.log(`API está rodando na porta ${PORT}`);
});
