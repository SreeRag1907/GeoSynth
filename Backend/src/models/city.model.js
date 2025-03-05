import mongoose, { model, Schema } from 'mongoose';

const citySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		noOfStores: {
			type: Number,
			required: true,
			default: 0,
		},
		stores: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Store',
			},
		],
	},
	{ timestamps: true }
);

export const City = model('City', citySchema);
