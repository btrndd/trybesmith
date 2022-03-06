import express from 'express';
import errorMiddleware from './middlewares/errorMiddleware';
import loginRouter from './routers/loginRouter';
import usersRouter from './routers/usersRouter';

const app = express();

app.use(express.json());

app.use('/users', usersRouter);

app.use('/login', loginRouter);

app.use(errorMiddleware.manage);

app.use(errorMiddleware.server);

export default app;
