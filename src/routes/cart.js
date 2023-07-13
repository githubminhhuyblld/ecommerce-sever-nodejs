const router = require("express").Router();
const cartController = require("../controllers/cartController")
const middlewareController = require("../middlewares/middlewareController")

//ADD ROLE
router.post("/",middlewareController.verifyTokenAndUserAuth ,cartController.addToCart);
//UPDATE QUANTITY
router.put("/quantity",middlewareController.verifyTokenAndUserAuth ,cartController.updateCartQuantity);
//REMOVE CART ITEM
router.delete("/",middlewareController.verifyTokenAndUserAuth ,cartController.removeCartItems);
//GET ALL CART BY USER ID
router.get("/:userId",middlewareController.verifyTokenAndUserAuth ,cartController.getAllCartsByUserId);


module.exports = router;