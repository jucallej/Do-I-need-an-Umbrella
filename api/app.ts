import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import paths from './paths';
require('express-async-errors');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

paths.forEach(controller => {
    app.use('/api', controller);
});

export default app;
