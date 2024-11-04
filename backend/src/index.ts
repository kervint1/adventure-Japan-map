import express from 'express';
import cors from 'cors';
import adventureSpotRoutes from './adventureSpotRoutes';

const app = express();
const port = 5000;

// CORSの設定 - 必要に応じてフロントエンドのURLを指定
const allowedOriginsRegex = /^https:\/\/adventure-japan-.*\.vercel\.app$/;

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOriginsRegex.test(origin) || origin === 'http://localhost:3000') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());
app.use('/api', adventureSpotRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
