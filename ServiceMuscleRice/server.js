import express from "express";
import mysql from "mysql2";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.resolve(__dirname, "../frontend");
app.use(express.static(frontendDir));
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendDir, "index.html"));
});

// -------------------------------------------
// 1. CONEXIÓN A LA BASE DE DATOS
// -------------------------------------------

const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "142005",
  database: "musclericedb"
});

conexion.connect(err => {
  if (err) {
    console.log("❌ Error de conexión:", err.message);
  } else {
    console.log("✅ Conexión exitosa a la base de datos!");
  }
});

// -------------------------------------------
// 2. RUTA DE PRUEBA
// -------------------------------------------

app.get("/prueba", (req, res) => {
  conexion.query("SELECT * FROM clientes", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// -------------------------------------------
// 3. PRODUCTOS
// -------------------------------------------

app.get("/productos", (req, res) => {
  conexion.query("SELECT * FROM productos", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// -------------------------------------------
// 4. REGISTRO DE USUARIO
// -------------------------------------------

app.post("/registro", (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
  }

  const query = `
    INSERT INTO clientes (nombre, email, password)
    VALUES (?, ?, ?)
  `;

  conexion.query(query, [nombre, email, password], (err, result) => {
    if (err) {
      // Error por email duplicado
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          mensaje: "Este correo ya está registrado"
        });
      }

      return res.status(500).json({ error: err.message });
    }

    res.json({
      mensaje: "Usuario registrado correctamente",
      id: result.insertId
    });
  });
});

// -------------------------------------------
// 5. LOGIN
// -------------------------------------------

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = `
    SELECT id, nombre, email
    FROM clientes
    WHERE email = ? AND password = ?
  `;

  conexion.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(401).json({
        mensaje: "Correo o contraseña incorrectos"
      });
    }

    res.json({
      mensaje: "Login exitoso",
      usuario: results[0]
    });
  });
});

// -------------------------------------------
// 6. PERFIL DE USUARIO (CUENTA)
// -------------------------------------------

app.get("/usuario/:id", (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT id, nombre, email
    FROM clientes
    WHERE id = ?
  `;

  conexion.query(query, [id], (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado"
      });
    }

    res.json(results[0]);
  });
});

// -------------------------------------------
// 7. PEDIDOS
// -------------------------------------------

app.get("/pedidos", (req, res) => {
  conexion.query("SELECT * FROM pedidos", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.get("/detalle-pedido", (req, res) => {
  conexion.query("SELECT * FROM detalle_pedido", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.get("/pagos", (req, res) => {
  conexion.query("SELECT * FROM pagos", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// -------------------------------------------
// 8. INICIAR SERVIDOR
// -------------------------------------------

app.listen(3000, () => {
  console.log("🔥 Servidor corriendo en http://localhost:3000");
});
