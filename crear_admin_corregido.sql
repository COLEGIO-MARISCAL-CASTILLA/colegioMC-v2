-- Query CORREGIDO para crear usuario admin directamente
-- Ejecutar en Supabase SQL Editor

-- Verificar estructura de la tabla users
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users' AND table_schema = 'public'
ORDER BY ordinal_position;

-- Crear usuario admin (SIN created_at y updated_at)
INSERT INTO users (username, password, nombre, rol) 
VALUES (
  'admin',
  '$2b$10$K8QqQqQqQqQqQqQqQqQu', -- bcrypt hash para 'admin123'
  'Directora Mariscal Castilla',
  'directora'
) ON CONFLICT (username) DO NOTHING;

-- Verificar usuario creado
SELECT * FROM users WHERE username = 'admin';
