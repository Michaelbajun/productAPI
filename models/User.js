const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstName : {
		type : String,
		required : [true, "First name is required"]
	},
	lastName : {
		type : String,
		required : [true, "Last name is required"]
	},
	email : {
		type : String,
		required : [true, "Email is required"]
	},
	password : {
		type : String,
		required : [true, "Password is required"]
	},
	isAdmin : {
		type : Boolean,
		default : false
	},
	mobileNo : {
		type : String, 
		required : [true, "Mobile No is required"]
	},
	orders : [
		{
			orderId : {
				type : String,
				required : [true, "Product ID is required"]
			},
			orderedOn : {
				type : Date,
				default : new Date()
			},			
			quantity: {
				type: Number,
				required: [true, "Quantity is required!"]
			},
			status : {
				type : String,
				default : "Pending"
			}
		}
	]
})

module.exports = mongoose.model("User", userSchema);

