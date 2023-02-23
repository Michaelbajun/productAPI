const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require("../auth");


// Routes

// Route for checking if the user's email already exists in the database
router.post("/checkEmail", (req, res) => {
	userController.checkEmailExists(req.body, res).then(resultFromController => res.send(resultFromController)) 
});

// Route for user registration
router.post("/register", (req, res) => {
	userController.registerUser(req.body).then(resultFromController => res.send(resultFromController))
});


// Route for user log in
router.post("/login", (req, res) => {
	userController.loginUser(req.body).then(resultFromController => res.send(resultFromController))
});


// Route for retrieving user details
router.get("/details", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization);
	console.log(userData)
	console.log(req.headers.authorization);

	userController.getProfile({id: userData.id}).then(resultFromController => res.send(resultFromController))
});

// Solution 2
/*router.post("/details", (req, res) => {
	userController.getProfile({req.body).then(resultFromController => res.send(resultFromController))
});
*/

// Route for checkout an authenticated user
router.post("/checkout", auth.verify, (req, res) => {

    const userData = auth.decode(req.headers.authorization);

    let data = {
        userId: userData.id,
        isAdmin: userData.isAdmin,
        productId: req.body.productId
    }

    userController.enroll(data).then(resultFromController =>res.send(resultFromController))
});
 

module.exports = router;