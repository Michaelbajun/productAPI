const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../auth");


// Routes
// Route for creating a product
router.post("/addProduct", (req, res) => {
	productController.addProduct(req.body).then(resultFromController => res.send(resultFromController))
});


// Route for adding a product
router.post('/addProduct', auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization)
	
	if(userData.isAdmin) {
		productController.addProduct(req.body).then(resultFromController => res.send(resultFromController))
	} else {
		res.send({auth: "failed"})
	}
});

// Route for retrieving all the products
router.get("/all", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization)

	productController.getAllProduct(userData).then(resultFromController => res.send(resultFromController))
});


// Route for retrieving all active product
router.get("/", (req, res) => {
	productController.getAllActive().then(resultFromController => res.send(resultFromController))
});


// Route for retrieving a specific product
router.get("/:productId", (req, res) => {
	console.log(req.params.productId)

	productController.getProduct(req.params).then(resultFromController => res.send(resultFromController))
});


// Route for updating a product
router.put("/:productId", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization)
	
	if(userData.isAdmin) {
		productController.updateProduct(req.params, req.body).then(resultFromController => res.send(resultFromController))
	} else {
		res.send({auth: "failed"})
	}
});

// Route to archiving a product
router.put('/archive/:productId', auth.verify, (req, res) => {

	const data = {
	productId : req.params.productId,
		isAdmin : auth.decode(req.headers.authorization).isAdmin
	}

	productController.archiveProduct(data).then(resultFromController => res.send(resultFromController))
});

// Route to activate a product
router.put('/activate/:productId', auth.verify, (req, res) => {

	const data = {
		productId : req.params.productId,
		isAdmin : auth.decode(req.headers.authorization).isAdmin
	}

	productController.activateProduct(data).then(resultFromController => res.send(resultFromController))
});

module.exports = router;