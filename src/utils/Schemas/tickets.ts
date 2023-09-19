import mongo from 'mongoose';

const { model, Schema } = mongo;

const tickets = new Schema({
	guild: String,
	category: String
});

export default model("ticketSchema", tickets);