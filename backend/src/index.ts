import express from 'express';
import cors from 'cors';
import adventureSpotRoutes from './adventureSpotRoutes';

const app = express();
const port = 5000;

// CORSを有効にする
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
      ? 'https://your-production-frontend-url.com' 
      : 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/api', adventureSpotRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
