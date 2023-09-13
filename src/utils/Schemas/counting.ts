/* eslint-disable @typescript-eslint/naming-convention */
import mongo from 'mongoose';
const {model, Schema} = mongo;

const a = new Schema({
	Guild: String,
	Channel: String,
	Number: String,
	LastUser: String,
	Options: {
		Strict: Boolean,
	},
});

export default model('countSchema', a);
