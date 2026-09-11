const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Database = require("better-sqlite3");
const cors = require("cors");

const app = express();
const db = new Database("banco.db");

app.use(cors());
app.use(express.json());
app.use(express.static("."));

const JWT_SECRET = "troque-esta-chave-por-uma-chave-secreta";

// Cria tabela de usuários
db.prepare(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL
  )
`).run();

// Cadastro
app.post("/api/cadastro", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({
      erro: "Preencha todos os campos."
    });
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  try {
    const resultado = db.prepare(`
      INSERT INTO usuarios (nome, email, senha)
      VALUES (?, ?, ?)
    `).run(nome, email, senhaHash);

    res.json({
      sucesso: true,
      mensagem: "Conta criada com sucesso!"
    });

  } catch (erro) {
    res.status(400).json({
      erro: "Este e-mail já está cadastrado."
    });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;

  const usuario = db.prepare(`
    SELECT * FROM usuarios WHERE email = ?
  `).get(email);

  if (!usuario) {
    return res.status(401).json({
      erro: "E-mail ou senha incorretos."
    });
  }

  const senhaCorreta = await bcrypt.compare(
    senha,
    usuario.senha
  );

  if (!senhaCorreta) {
    return res.status(401).json({
      erro: "E-mail ou senha incorretos."
    });
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      email: usuario.email
    },
    JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );

  res.json({
    sucesso: true,
    mensagem: "Login realizado!",
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    }
  });
});

app.listen(3000, () => {
  console.log("LUMINA rodando em http://localhost:3000");
});