import 'dotenv/config';
import { createServer } from 'http';
import { createApp } from './app.js';
import { connectToDatabase } from './config/database.js';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

async function main() {
  await connectToDatabase();
  const app = createApp();
  const server = createServer(app);
  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Donare Express backend running at http://localhost:${PORT}`);
  });
}

// eslint-disable-next-line no-console
main().catch((err) => { console.error('Failed to start server', err); process.exit(1); });


