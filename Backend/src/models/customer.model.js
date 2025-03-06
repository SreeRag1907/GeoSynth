import mongoose, { model, Schema } from 'mongoose';

const customerSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		location: {
			type: {
				type: String,
				enum: ['Point'],
				required: true,
			},
			coordinates: {
				type: [Number],
				required: true,
			},
		},
		orders: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Order',
			},
		],
	},
	{ timestamps: true }
);

export const Customer = model('Customer', customerSchema);
