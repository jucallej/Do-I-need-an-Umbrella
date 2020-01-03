import serverless from 'serverless-http';
import app from './api/app';

export const handler = serverless(app);
