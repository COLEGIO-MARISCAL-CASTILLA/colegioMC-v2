# Deployment Guide - Vercel + Supabase

## Pasos para Despliegue

### 1. Configurar Supabase
1. Crear cuenta en [supabase.com](https://supabase.com)
2. Crear nuevo proyecto
3. Obtener la URL de la base de datos: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`
4. Ejecutar migraciones en Supabase:
   ```bash
   npm run db:generate
   # Copiar el contenido de la carpeta migrations y ejecutar en el SQL Editor de Supabase
   ```

### 2. Configurar Variables de Entorno en Vercel
En el dashboard de Vercel, ir a Settings > Environment Variables y agregar:

```
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
SESSION_SECRET=tu_secreto_aleatorio_seguro
ADMIN_USERNAME=admin
ADMIN_PASSWORD=tu_contraseña_segura
NODE_ENV=production
```

### 3. Despliegue en Vercel
1. Conectar repositorio a Vercel
2. Vercel detectará automáticamente la configuración
3. Hacer deploy

## Cambios Realizados

### Base de Datos
- ✅ Configuración para usar Supabase con SSL en producción
- ✅ Variables de entorno correctamente configuradas
- ✅ Drizzle config actualizado

### Configuración Vercel
- ✅ `vercel.json` creado con rutas correctas
- ✅ Serverless functions configuradas
- ✅ Build script para Vercel

### Optimizaciones
- ✅ Removidos plugins de Replit
- ✅ Puerto dinámico para Vercel
- ✅ Build optimizado para producción

## Verificación Local
```bash
npm run build
npm start
```

## Notas Importantes
- El proyecto usará PostgreSQL de Supabase
- SSL habilitado para conexiones seguras
- Configuración optimizada para serverless functions
- Build automático en cada deploy
