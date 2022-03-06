import express from 'express';
import errorMiddleware from './middlewares/errorMiddleware';
import loginRouter from './routers/loginRouter';
import usersRouter from './routers/usersRouter';
import productsRouter from './routers/productsRouter';
import ordersRouter from './routers/ordersRouter';

const app = express();

app.use(express.json());

app.use('/users', usersRouter);

app.use('/login', loginRouter);

app.use('/products', productsRouter);

app.use('/orders', ordersRouter);

app.use(errorMiddleware.manage);

app.use(errorMiddleware.server);

export default app;
