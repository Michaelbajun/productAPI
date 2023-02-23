const User = require('../models/User');
const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const auth = require("../auth");


// Controller Functions

// Checking Email
module.exports.checkEmailExists = (reqBody, res) => {
	// The result is sent back to the frontend via the "then" method found in the route file
	return User.find({email: reqBody.email}).then(result => {
		console.log(result[0].email)
		console.log(result.length)
		// The "find" method returns a record if a match is found
		if(result.length > 0) {
			return true
		// No duplicate email found
		// The user is not yet registered in the database
		} else {
			return false
		}
	})
	.catch(error => res.send(error))
};


// User Registration
module.exports.registerUser = (reqBody) => {
	
	// Creates a variable "newUser" and instantiates a new "User" object using the mongoose model
	// Uses the information from the request body to provide all the necessary information
	let newUser = new User({
		firstName: reqBody.firstName,
		lastName: reqBody.lastName,
		email: reqBody.email,
		mobileNo: reqBody.mobileNo,
		// 10 is the value provided as the number of "salt" rounds that the bcrypt algorithm will run in order to encrypt the password
		//hashSync(<dataToBeHash>, <saltRound>)
		password: bcrypt.hashSync(reqBody.password, 10)
	})

	// Saves the created object to our database
	return newUser.save().then((user, error) => {
		// User registration failed
		if(error) {
			return false
		// User registration successful
		} else {
			return true
		}
	})
};


// User Log in or User Authentication
module.exports.loginUser = (reqBody) => {
	// The "findOne" method returns the first record in the collection that matches the search criteria
	// We use the "findOne" method instead of the "find" method which returns all records that match the search criteria
	return User.findOne({email: reqBody.email}).then(result => {

		// User does not exist
		if(result == null) {
			return false

		// User exists
		} else {

			// Create the variable "isPasswordCorrect" to return the result of comparing the login form password and the database password
			// The "compareSync" method is used to compare a non encrypted password from the login form to the encrypted password retrieved from the database and returns "true" or "false" value depending on the result
			//compareSync(<dataToCompare>, <encryptedPassword>)
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password)

			// If the passwords match/result of the above code is true
			if(isPasswordCorrect){
				// Generate an access token
				// Uses the "createAccessToken" method defined in the "auth.js" file
				// Returning an object back to the frontend application is common practice to ensure information is properly labeled and real world examples normally return more complex information represented by objects
				return {access: auth.createAccessToken(result)}
			// Passwords do not match
			} else {
				return false
			}
		}
	})
};

// Retreive user details
module.exports.getProfile = (userData) => {
	return User.findById(userData.id).then(result => {
		// console.log(data.userId);
		// console.log(result);
		
		if (result == null) {
			return false
		} else {
			result.password = "*****"

			return result
		}
	})
};



// User checkout to a product
module.exports.checkout = async (data) => {

	if (data.isAdmin == true) {
		return false
	} else {
		let isUserUpdated = await User.findById(data.userId).then(user => {

			user.orders.push({productId: data.productId});
			return user.save().then((user, error) => {
				if(error) {
					return false
				} else {
					return true
				}
			})
		});

		let isProductUpdated = await Product.findById(data.productId).then(product => {

			product.userOrder.push({userId: data.userId});

			return product.save().then((product, error) => {
				if (error) {
					return false
				} else {
					return true
				}
			})
		});

		if (isUserUpdated && isProductUpdated) {
			return true
		} else {
			return false
		};
	}
};