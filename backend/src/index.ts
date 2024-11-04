import express from 'express';
import adventureSpotRoutes from './adventureSpotRoutes';

const app = express();
const port = 5000;

app.use('/api', adventureSpotRoutes);
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
