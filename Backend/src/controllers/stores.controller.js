import { City } from '../models/city.model.js';
import { Store } from '../models/stores.model.js';
import { ApiError } from '../utils/ApiError.utils.js';
import { ApiResponse } from '../utils/ApiResponse.utils.js';
import { AsyncHandler } from '../utils/AsyncHandler.utils.js';

const registerStore = AsyncHandler(async (req, res) => {
	const { name, longitude, latitude, rent, cityName } = req.body;

	if (!name || !longitude || !latitude || !rent || !cityName) {
		throw new ApiError(400, 'all fields are required...');
	}

	const isStoreExisted = await Store.findOne({ name });

	if (isStoreExisted) {
		throw new ApiError(409, 'Store No Already Existed...');
	}

	const cityDetails = await City.findOne({ name: cityName });

	if (!cityDetails) {
		throw new ApiError(404, 'City not found...');
	}

	const storeNumber = cityDetails?.noOfStores + 1;

	const store = await Store.create({
		storeNo: storeNumber,
		name,
		location: {
			type: 'Point',
			coordinates: [longitude, latitude],
		},
		rent,
	});

	if (!store) {
		throw new ApiError(400, 'store not created...');
	}

	const updateCity = await City.findOneAndUpdate(
		{ name: cityName },
		{ $push: { stores: store._id }, $inc: { noOfStores: 1 } },
		{ new: true }
	);

	if (!updateCity) {
		await Store.deleteOne({ _id: store._id });
		throw new ApiError(400, 'store not created...');
	}

	return res
		.status(200)
		.json(new ApiResponse(200, store, 'store created successfully...'));
});

export { registerStore };
