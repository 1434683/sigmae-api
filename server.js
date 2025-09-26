import pkg from "pg";
const { Pool } = pkg;

// pegue do Cloud Run → Variáveis de ambiente do sigmae-api
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,   // pode ser IP público ou socket (ver nota abaixo)
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});

export default pool;
