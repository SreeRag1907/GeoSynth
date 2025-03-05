import mongoose, { model, Schema } from 'mongoose';

const orderSchema = new Schema(
	{
		product: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export const Order = model('Order', orderSchema);
