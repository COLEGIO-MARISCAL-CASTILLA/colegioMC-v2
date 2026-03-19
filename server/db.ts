

import { Pool } from "pg"
import dotenv from "dotenv"
import { drizzle } from "drizzle-orm/node-postgres";

dotenv.config();

// Configuración para Supabase
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:clancito548@localhost:5432/mariscal_castilla";

export const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
})

export const db = drizzle(pool);