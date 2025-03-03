import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/user.controller.js';

const router = Router();

router.route('/').get((req, res) => {
	res.json({ message: 'Hello World!' });
});

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

export default router;
