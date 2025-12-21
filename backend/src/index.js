import express from 'express';
import cookieParser from 'cookie-parser';
import dbConnect from './config/dbConnect.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors(
  {
    origin: 'https://aapka-khata.vercel.app',
    credentials: true,
  }
));

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
  dbConnect();
});
