const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Course is required"]
	},
	description: {
		type: String,
		required: [true, "Description is required"]
	},
	isActive: {
		type: Boolean,
		default: true
	},
	price: {
		type: Number,
		required: [true, "Price is required"]
	},
	createdOn: {
		type: Date,
		default: new Date()
	},
	userOrder: [
			{
				userId: {
					type: String,
					required: [true, "UserID is required"]
				},
				orderedOn: {
					type: Date,
					default: new Date()
				}
			}
		]
});


module.exports = mongoose.model("Product", courseSchema);