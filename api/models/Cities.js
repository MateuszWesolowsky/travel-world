const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitiesSchema = new Schema({
	cityName: {
		type: String,
	},
	country: {
		type: String,
	},
	countryCode: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	notes: {
		type: String,
	},
	position: {
		lat: {
			type: String,
		},
		lng: {
			type: String,
		},
	},
});

module.exports = mongoose.model("Cities", CitiesSchema);
