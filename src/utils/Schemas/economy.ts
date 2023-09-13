/* eslint-disable @typescript-eslint/naming-convention */
import type {Model} from 'mongoose';
import mongo from 'mongoose';
const {model, Schema} = mongo;

const eco = new Schema({
	User: String,
	Stars: Number,
	Tokens: Number,
	Food: Number,
	Power: Number,
	Badges: Array,
	Multi: Number,
	Level: Number,
});

const SchemaModel = model('economySchema', eco);

export default {
	model: SchemaModel,
	async create(model: Model<unknown, unknown, unknown>, user: string): Promise<void> {
		await model.create({
			User: user,
			Stars: 0,
			Tokens: 0,
			Food: 100,
			Power: 100,
			Badges: [],
			Multi: 1,
			Level: 0,
		});
	},
	async delete(model: Model<unknown, unknown, unknown>, user: string) {
		await model.deleteOne({
			User: user,
		});
	},
};
