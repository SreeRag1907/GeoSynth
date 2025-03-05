import { City } from '../models/city.model.js';
import { ApiError } from '../utils/ApiError.utils.js';
import { ApiResponse } from '../utils/ApiResponse.utils.js';
import { AsyncHandler } from '../utils/AsyncHandler.utils.js';

const registerCity = AsyncHandler(async (req, res) => {
	const { name } = req.body;

	if (!name) {
		throw new ApiError(400, 'name required...');
	}

	const isCityExisted = await City.findOne({ name });

	if (isCityExisted) {
		throw new ApiError(409, 'City Already Existed...');
	}

	const city = await City.create({ name });

	if (!city) {
		throw new ApiError(400, 'city not created...');
	}

	return res
		.status(200)
		.json(new ApiResponse(200, city, 'city created successfully...'));
});

export { registerCity };
