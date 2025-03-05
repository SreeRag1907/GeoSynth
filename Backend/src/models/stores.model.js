import mongoose, { model, Schema } from 'mongoose';

const storeSchema = new Schema(
	{
		storeNo: {
			type: Number,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		location: {
			type: Point,
			coordinates: [Number, Number],
			required: true,
		},
		rent: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

export const Store = model('Store', storeSchema);
