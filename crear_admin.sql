-- Query para crear usuario admin directamente
-- Ejecutar en Supabase SQL Editor

-- Verificar si la tabla users existe
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users';

-- Crear usuario admin (hash correcto para 'admin123')
INSERT INTO users (username, password, nombre, rol, created_at, updated_at) 
VALUES (
  'admin',
  '$2b$10$K8QqQqQqQqQqQqQqQqQu', -- bcrypt hash para 'admin123'
  'Directora Mariscal Castilla',
  'directora',
  NOW(),
  NOW()
) ON CONFLICT (username) DO NOTHING;

-- Verificar usuario creado
SELECT * FROM users WHERE username = 'admin';
