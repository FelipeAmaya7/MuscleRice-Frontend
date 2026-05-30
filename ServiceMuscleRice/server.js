import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Importar rutas modularizadas
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

// Configurar variables de entorno
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.resolve(__dirname, "../WebsiteMuscleRice");

// Servir archivos estáticos del frontend
app.use(express.static(frontendDir));

// Rutas de la aplicación (en raíz para compatibilidad con el frontend)
app.use("/", authRoutes);
app.use("/", productRoutes);

// Servir el index.html en la ruta inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendDir, "index.html"));
});

// Ruta de prueba rápida de base de datos
app.get("/prueba", async (req, res) => {
  try {
    const db = await import("./config/db.js").then(m => m.default);
    const [results] = await db.query("SELECT * FROM clientes LIMIT 5");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});
