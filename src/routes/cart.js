const router = require("express").Router();
const cartController = require("../controllers/cartController")
const middlewareController = require("../middlewares/middlewareController")

//ADD ROLE
router.post("/",middlewareController.verifyTokenAndUserAuth ,cartController.addToCart);


module.exports = router;