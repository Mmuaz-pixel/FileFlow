const mongoose = require('mongoose');
const { Schema } = mongoose;

const Files = new Schema({
	filename: {
		type: String,
		required: true
	},

	path: {
		type: String,
		required: true
	},

	size: {
		type: Number,
		required: true
	},

	uuid: {
		type: String,
		required: true
	},

	sender: {
		type: String,
		required: false // for emails 
	},

	reciever: {
		type: String,
		required: false // for emails 
	}
}, { timestamps: true })

module.exports = mongoose.model('File', Files); 