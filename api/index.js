// Vercel serverless function entry point
import express from 'express';
import { createServer } from 'http';

// Import server routes
const { registerRoutes } = await import('../server/index.js');

// Create Express app
const app = express();
app.use(express.json());

// Create HTTP server
const httpServer = createServer(app);

// Initialize server
async function initializeServer() {
  try {
    await registerRoutes(httpServer, app);
    console.log('✅ Routes registered successfully');
  } catch (err) {
    console.error('❌ Error initializing server:', err);
  }
}

// Initialize on first call
let initialized = false;
async function ensureInitialized() {
  if (!initialized) {
    await initializeServer();
    initialized = true;
  }
}

// Export handler for Vercel
export default async function handler(req, res) {
  await ensureInitialized();
  
  // Handle the request with Express
  return new Promise((resolve, reject) => {
    app(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
