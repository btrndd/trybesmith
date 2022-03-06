import express from 'express';
import errorMiddleware from './middlewares/errorMiddleware';
import loginRouter from './routers/loginRouter';
import usersRouter from './routers/usersRouter';
import productsRouter from './routers/productsRouter';

const app = express();

app.use(express.json());

app.use('/users', usersRouter);

app.use('/login', loginRouter);

app.use('/products', productsRouter);

app.use(errorMiddleware.manage);

app.use(errorMiddleware.server);

export default app;
