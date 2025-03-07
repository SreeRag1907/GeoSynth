import express from 'express';
import cors from 'cors';

const app = express();

app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));

// routes

import router from './routes/index.route.js';

app.use('/api', router);

// http://localhost:8000/api/

export default app;
