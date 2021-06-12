import path from 'path';

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import connectDB from './config/db.js';

import productsRoutes from './routes/productsRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import {notFound, errorHandler} from './middleware/error.js';

dotenv.config();

connectDB();

const app = express();

if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  res.json('API is running....');
})

app.use('/api/products', productsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use((req, res, next) => {
  console.log('Body: ', req.body);
  next();
})
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode.`);
})