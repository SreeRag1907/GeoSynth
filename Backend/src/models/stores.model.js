import mongoose, { model, Schema } from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const storeSchema = new Schema(
	{
		storeNo: {
			type: Number,
			required: true,
		},
		name: {
			type: String,
			required: true,
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
		rent: {
			type: Number,
			required: true,
		},
		totalOrders: {
			type: Number,
			default: 0,
		},
		revenue: {
			type: Number,
			default: 0,
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

export const Store = model('Store', storeSchema);
