const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
	name:{
		default:"sinki",
		type:String,
	},
	content:String
});

module.exports = mongoose.model('goal',goalSchema);
