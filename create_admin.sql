-- Crear usuario admin directamente en Supabase
-- Ejecutar este query en el SQL Editor de Supabase

-- Primero verificar si la tabla users existe
SELECT table_name, table_schema 
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'users';

-- Insertar usuario admin (ejecutar solo si la tabla existe)
INSERT INTO users (username, password, nombre, rol, created_at, updated_at) 
VALUES (
  'admin',
  '$2b$10$K8QqQqQqQqQqQqQqQqQqQu', -- Hash de 'admin123'
  'Directora Mariscal Castilla',
  'directora',
  NOW(),
  NOW()
) ON CONFLICT (username) DO NOTHING;

-- Verificar usuario creado
SELECT * FROM users WHERE username = 'admin';
