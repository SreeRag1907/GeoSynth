import { Customer } from '../models/customer.model.js';
import { Order } from '../models/order.model.js';
import { Store } from '../models/stores.model.js';
import { ApiError } from '../utils/ApiError.utils.js';
import { AsyncHandler } from '../utils/AsyncHandler.utils.js';
import { ApiResponse } from '../utils/ApiResponse.utils.js';

const registerOrder = AsyncHandler(async (req, res) => {
	const { product, customer, storeName } = req.body;

	if (!product || !customer || !storeName) {
		throw new ApiError(400, 'product is required...');
	}

	const createdOrder = await Order.create({ product });

	if (!createdOrder) {
		throw new ApiError(400, 'Order is not created...');
	}

	const consumer = await Customer.findOne({ name: customer });

	// console.log(consumer);

	if (!consumer) {
		await Order.findByIdAndDelete(createdOrder._id);
		throw new ApiError(400, 'the order cant update in customer table...');
	}

	const store = await Store.findOneAndUpdate(
		{ name: storeName },
		{
			$push: {
				orders: createdOrder._id,
			},
		},
		{
			new: true,
		}
	);

	return res
		.status(200)
		.json(new ApiResponse(200, createdOrder, 'order has been created...'));

	return res;
});

export { registerOrder };
