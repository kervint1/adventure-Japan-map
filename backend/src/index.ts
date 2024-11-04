import express from 'express';
import cors from 'cors';
import adventureSpotRoutes from './adventureSpotRoutes';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const port = 5000;

const allowedOriginsRegex = /^https:\/\/adventure-japan-.*\.vercel\.app$/;
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOriginsRegex.test(origin) || origin === 'http://localhost:3000') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
app.use('/api', adventureSpotRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Prisma のエラーハンドリング
prisma.$connect().catch((error) => {
  console.error("Prisma client failed to connect:", error);
  process.exit(1);
});
