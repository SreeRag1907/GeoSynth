import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/user.controller.js';
import axios from 'axios';
import { FLASK_URL } from '../constants.js';

const router = Router();

router.route('/').get((req, res) => {
	res.json({ message: 'Hello World!' });
});

router.route('/flask').get(async (req, res) => {
	try {
		const response = await axios.get(`${FLASK_URL}/`);
		res.json(response.data);
	} catch (error) {
		res.status(500).json({ error: 'Error connecting to Flask server' });
	}
});

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

export default router;
