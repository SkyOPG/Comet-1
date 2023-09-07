/* eslint-disable @typescript-eslint/naming-convention */
import mongo from 'mongoose';
const {model, Schema} = mongo;

const fileSchema = new Schema({
	Filename: String,
	Owner: String,
	Views: Number,
	Forks: Number,
	FileData: {
		isPrivate: Boolean,
		Code: String,
	},
});

const SchemaModel = model('files', fileSchema);

export default {
	model: SchemaModel,
	async create(model: mongo.Model<any, unknown, unknown>, owner: string, file: string): Promise<void> {
		await model.create({
			Filename: file,
			Owner: owner,
			Views: 0,
			Forks: 0,
			FileData: {
				isPrivate: false,
				Code: '',
			},
		});
	},
	async delete(model: mongo.Model<any, unknown, unknown>, owner: string, file: string): Promise<void> {
		await model.deleteOne({
			Owner: owner,
			Filename: file,
		});
	},
};
