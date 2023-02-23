const Product = require("../models/Product");
const User = require('../models/User');

// Controller Functions:

// Creating a new product
module.exports.addProduct = (reqBody) => {

	// Creates a variable "newProduct" and instantiates a new "Product" object using the mongoose model
	// Uses the information from the request body to provide all the necessary information
	let newProduct = new Product({
		name: reqBody.name,
		description: reqBody.description,
		price: reqBody.price
	});


	// Saves the created object to our database
	return newProduct.save().then((product, error) => {

		// Product creation failed
		if(error) {

			return false

		// Product creation successful
		} else {

			return true
		}
	})
}


//Activity Solution 2
/*module.exports.addCourse = (reqBody, userData) => {

    return User.findById(userData.userId).then(result => {

        if (userData.isAdmin == false) {
            return "You are not an admin"
        } else {
            let newProduct = new Product({
                name: reqBody.name,
                description: reqBody.description,
                price: reqBody.price
            })
        
            //Saves the created object to the database
            return newProduct.save().then((course, error) => {
                //Product creation failed
                if(error) {
                    return false
                } else {
                    //course creation successful
                    return "Product creation successful"
                }
            })
        }
        
    });    
}*/


// Retriving All Product
module.exports.getAllProduct = (data) => {

	if(data.isAdmin) {
		return Product.find({}).then(result => {

			return result
		})
	} else {
		return false // "You are not an Admin."
	}
};


// Retrieve All Active Courses
module.exports.getAllActive = () => {

	return Product.find({isActive: true}).then(result => {

		return result
	})
};


// Retrieve a Specific Product
module.exports.getProduct = (reqParams) => {

	return Product.findById(reqParams.productId).then(result => {

		return result
	})
};


// Update a Specific Product
module.exports.updateCourse = (reqParams, reqBody) => {

	let updatedProduct = {
		name: reqBody.name,
		description: reqBody.description,
		price: reqBody.price
	}

	return Product.findByIdAndUpdate(reqParams.productId, updatedProduct).then((updatedProduct, error) => {

		console.log(updatedProduct)
		if(error) {
			return false
		} else {
			return true
		}
	}) 

};


// Archive A Product

module.exports.archiveProduct = (data) => {

	return Product.findById(data.productId).then((result, err) => {

		if(data.isAdmin === true) {

			result.isActive = false;

			return result.save().then((archivedProduct, err) => {

				// Product not archived
				if(err) {

					return false;

				// Product archived successfully
				} else {

					return true;
				}
			})

		} else {

			//If user is not Admin
			return false
		}

	})
};


module.exports.activateProduct = (data) => {

	return Product.findById(data.productId).then((result, err) => {

		if(data.isAdmin === true) {

			result.isActive = true;

			return result.save().then((activateProduct, err) => {

				// Product not activated
				if(err) {

					return false;

				// Product activated successfully
				} else {

					return true;
				}
			})

		} else {

			//If user is not Admin
			return false
		}

	})
};

