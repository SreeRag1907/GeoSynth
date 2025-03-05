import { City } from '../models/city.model.js';
import { Customer } from '../models/customer.model.js';
import { ApiError } from '../utils/ApiError.utils.js';
import { ApiResponse } from '../utils/ApiResponse.utils.js';
import { AsyncHandler } from '../utils/AsyncHandler.utils.js';

const registerCustomer = AsyncHandler(async (req, res) => {
	const { name, email, longitude, latitude, city } = req.body;

	if (!name || !email || !longitude || !latitude || !city) {
		throw new ApiError(400, 'all fields are required....');
	}

	const isCustomerExisted = await Customer.findOne({ email });

	if (isCustomerExisted) {
		console.log(isCustomerExisted);

		throw new ApiError(400, 'Customer already existed');
	}

	const customer = await Customer.create({
		name,
		email,
		location: {
			type: 'Point',
			coordinates: [longitude, latitude],
		},
	});

	if (!customer) {
		throw new ApiError(400, 'Customer not created');
	}

	const temp = await City.findOneAndUpdate(
		{ name: city },
		{
			$push: {
				customers: customer._id,
			},
		},
		{
			new: true,
		}
	);
	i++;

	// console.log(temp);

	return res
		.status(200)
		.json(new ApiResponse(200, {}, 'customer created successfully...'));
});

const getUsers = AsyncHandler(async (req, res) => {
	const arr = await Customer.find();

	// console.log(arr);

	res.status(200).json(new ApiResponse(201, arr, 'thats it'));
});

export { registerCustomer, getUsers };
