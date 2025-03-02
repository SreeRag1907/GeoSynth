import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';

dotenv.config({ path: './.env' });

connectDB()
	.then(() => {
		app.on('error', (error) => {
			console.log('error in connecting to mongodb', error);
			throw error;
		});
		app.listen(process.env.PORT || 8080, () => {
			console.log('Server is running on port 8000');
		});
	})
	.catch((error) => {
		console.log('mongodb promise is rejected.....', error);
	});
