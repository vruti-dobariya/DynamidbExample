// 📁 server/server.js
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', userRoutes);

app.listen(4000, () => {
  console.log('Server running at http://localhost:4000');
});