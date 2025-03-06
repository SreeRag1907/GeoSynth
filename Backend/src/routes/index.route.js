import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/user.controller.js';
import axios from 'axios';
import { FLASK_URL } from '../constants.js';
import { registerCity } from '../controllers/city.controller.js';
import { getStores, registerStore } from '../controllers/stores.controller.js';
import {
	getUsers,
	registerCustomer,
} from '../controllers/customer.controller.js';
import { registerOrder } from '../controllers/order.controller.js';

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

router.route('/register-city').post(registerCity);
router.route('/register-store').post(registerStore);

router.route('/register-customer').post(registerCustomer);
router.route('/register-order').post(registerOrder);

router.route('/get-customers').post(getUsers);
router.route('/get-stores').post(getStores);

router.route('/get-stores').post(giveCustomerToFlask);

export default router;
